---
title: Native, isomorphic, asynchronous decompression in JavaScript
lede: Native, isomorphic, asynchronous decompression in JavaScript with Compression Streams API
authors:
  - name: Jeremy Nguyen
tags:
  - javascript
  - compression
mastodonId: "117499663189966277"
publishedDate: "2026-10-25T04:30:44Z"
---

Suppose you want to decompress data in JavaScript isomorphically. Shipping a JavaScript or WebAssembly decompressor would be difficult, slow, and have a bundle size cost; Facebook found that native implementations were about 20x faster than their JavaScript counterparts and 10% faster than the WASM implementation.[^1] The natural impulse would be to reach for Node's built-in [`zlib`](https://nodejs.org/api/zlib.html) library, but then you would be excluding browsers as a platform. Usually, it seems that people tend to opt for this option and fall back to either the npm libraries [`pako`](https://github.com/nodeca/pako) or [`fflate`](https://npmx.dev/package/fflate) for browser support.

There is, however, one native and isomorphic solution to this: the [Compression Streams API](https://developer.mozilla.org/en-US/docs/Web/API/Compression_Streams_API). It enjoys broad support across all browsers since May 2023 (at least for gzip), and is supported on Node.js 17, Deno 1.19, and Bun 1.3.3.[^2]

However, it comes with the massive caveat that you have to use JavaScript streams. Streams in JavaScript, unfortunately, have a host of issues that can best be summarized by James Snell's article ["We deserve a better streams API for JavaScript,"](https://blog.cloudflare.com/a-better-web-streams-api/) where he raises concerns about poor performance, excessively burdensome specification standards, and some other real-world failures.[^3]

## Prior art

Denis Golubev wrote the article ["Using DecompressionStream with an ArrayBuffer"](https://www.golubev.dev/using-decompression-stream/) on June 12, 2024. It's a lot more manual compared to my implementation, but I appreciated having a place to start. He also lists some other alternative approaches and/or improvements that I think may be helpful.[^4]

## Converting a Uint8Array to a ReadableStream

There are many ways to create a ReadableStream from a Uint8Array: `new Blob().stream`, `new Response().body`, `new ReadableStream()`, or `ReadableStream.from`. I benchmarked all of these ([benchmarks here](https://gist.github.com/jeremy-code/227ebe73ecef0e397eaf445fcb9d26de)) and found varying performance across the major browsers. Interestingly, Node.js differed from Chrome despite both using the V8 engine; in Node, `new Blob().stream` was the most performant. I suspect the reason for this is that it is easier to optimize `new Blob().stream` since Node.js can guarantee its output is a stream of bytes. Since Node.js is what I will be using for testing and because `new Blob().stream()` has the tersest syntax, it will be what I will be using.

The code for this article will be available in the following repository: [jeremy-code/fast-js-uncompress](https://github.com/jeremy-code/fast-js-uncompress).

Consider the following code:

```typescript
export const uncompress = async (
  val: BufferSource,
  format: CompressionFormat,
): Promise<Uint8Array<ArrayBuffer>> => {
  return new Response(
    new Blob([val]).stream().pipeThrough(new DecompressionStream(format)),
  ).bytes();
};
```

Now, let's benchmark this against the native Node.js [`gunzipSync`](https://beta.docs.nodejs.org/zlib#zlibgunzipsyncbuffer-options) and see how much of a difference it makes. This is on my M1 MacBook Air and Node.js v26.12.1. While I could benchmark against the asynchronous Node.js implementation ([`gunzip`](https://beta.docs.nodejs.org/zlib#zlibgunzipbuffer-options-callback)) since turning that into an asynchronous function requires [`promisify`](https://beta.docs.nodejs.org/util/promisify), I'm not sure how apt a comparison would be. I suspect using [`createGunzip`](https://beta.docs.nodejs.org/zlib/createGunzip) would not be a meaningful comparison since at that point, you would only be comparing the performance of Node.js streams compared to their web equivalent.

| name                                                  |        hz |    min |   max |   mean |    p75 |    p99 |   p995 |   p999 |    rme | samples |
| ----------------------------------------------------- | --------: | -----: | ----: | -----: | -----: | -----: | -----: | -----: | -----: | ------: |
| native                                                | 12,708.86 |  0.072 | 2.009 | 0.0821 | 0.0804 | 0.1485 | 0.2275 | 0.9947 | ±0.77% |   24345 |
| new Response(new Blob().stream.pipeThrough()).bytes() |  5,986.25 | 0.1266 | 4.235 | 0.1982 | 0.1698 | 1.0286 | 1.1869 | 1.5047 | ±1.64% |   10087 |

Oh... that's not good. That's about 52.90% less throughput when using `DecompressionStream`. If you look in the debugger, it looks like most of the slowdown can be attributed to the overhead of promises and streams; the actual compression does not take that much time. The benchmarking setup actually makes the Compression Streams API look closer than it would be typically (tiny-bench by default warms up benchmarks): for a cold start, I got somewhere between 60-70ms with `DecompressionStream` compared to 1-3ms with the native Node.js `gunzipSync`. Subsequent runs with `DecompressionStream` ended up being around 16-17ms. You can see what a sample run looks like in the debugger.

![Node.js DecompressionStream Blob stream performance trace](./assets/node-decompress-stream-blob-trace.jpg)

## _Not_ converting a Uint8Array to a ReadableStream

My guess is that the issue is that since we already have the entire input in memory, converting it to a stream only adds extra overhead and avoids most of the benefits of streaming input. The easiest way to resolve this issue would be to remove the streams altogether, but clearly that is impossible.

However, there is a way we can attempt to convince JavaScript to parse the entire block in memory. You see, `DecompressionStream` is a [`TransformStream`](https://developer.mozilla.org/en-US/docs/Web/API/TransformStream), which is really just a wrapper for a `ReadableStream` and a [`WritableStream`](https://developer.mozilla.org/en-US/docs/Web/API/WritableStream). If we use the `.writable` end to write our input, and pass the `.readable` end into a Response, this may yield extra performance.

Here's one possible implementation of how to do this. I attempted to test a lot of different implementations using the same concept, but, as far as I could tell, none consistently outperformed another.

```typescript
export const uncompress = async (
  val: BufferSource,
  format: CompressionFormat,
): Promise<Uint8Array<ArrayBuffer>> => {
  const decompressionStream = new DecompressionStream(format);
  const response = new Response(decompressionStream.readable);
  const writer = decompressionStream.writable.getWriter();
  return Promise.all([
    response.bytes(),
    writer.write(val),
    writer.close(),
  ]).then((res) => res[0]);
};
```

How well does it do in terms of performance? Well, on average, it seems that it took ~53ms for a cold start and then afterwards 15-16ms for our sample payload. I would say that means it's a good deal faster on cold starts and maybe a little bit faster when warm.

![Node.js DecompressionStream getWriter performance trace](./assets/node-decompress-stream-get-writer-trace.jpg)

Here are the benchmarks, where I got a 46.79% decrease from the native Node.js synchronous equivalent using this method.

| name                                                  | hz        | min    | max     | mean   | p75    | p99    | p995   | p999   | rme    | samples |
| ----------------------------------------------------- | --------- | ------ | ------- | ------ | ------ | ------ | ------ | ------ | ------ | ------- |
| native                                                | 12,767.98 | 0.0708 | 16.6303 | 0.083  | 0.0805 | 0.1216 | 0.2268 | 1.0248 | ±1.96% | 24087   |
| decompressionStream.writable.getWriter                | 6,794.17  | 0.1099 | 4.8245  | 0.1776 | 0.1506 | 0.9504 | 1.1743 | 2.3528 | ±1.88% | 11258   |
| new Response(new Blob().stream.pipeThrough()).bytes() | 5,966.48  | 0.1299 | 3.3241  | 0.1997 | 0.1698 | 1.006  | 1.1745 | 2.2621 | ±1.64% | 10013   |

## Additional notes

I looked for other ways to attempt to speed this up, but I could not find any. You might be able to squeeze extra performance in Node.js using Vercel's [experimental-fast-webstreams](https://github.com/vercel-labs/fast-webstreams) package with native `pipeThrough`.

One method that sometimes was more performant was using the gzip format to create the output `Uint8Array` yourself. The gzip compression algorithm stores the size of the uncompressed payload as a little-endian uint32. Here's one possible implementation of this. If `DecompressionStream` implemented BYOB reading, this may become more viable in the future.

```typescript
export const uncompress = async (
  val: BufferSource,
): Promise<Uint8Array<ArrayBuffer>> => {
  const decompressionStream = new DecompressionStream("gzip");
  const writer = decompressionStream.writable.getWriter();
  writer.write(val);
  writer.close();

  const uncompressedSize = (
    ArrayBuffer.isView(val)
      ? new DataView(val.buffer, val.byteOffset, val.byteLength)
      : new DataView(val)
  ).getUint32(val.byteLength - 4, true);
  const output = new Uint8Array(uncompressedSize);
  let offset = 0;

  for await (let chunk of decompressionStream.readable) {
    output.set(chunk, offset);
    offset += chunk.byteLength;
  }

  return output;
};
```

## Conclusion

If you need an isomorphic way to decompress content, the Compression Streams API may or may not be a solution for you.

Honestly, for now, if performance is a concern, I would prefer using Node.js subpath imports using the `node` condition and falling back to `DecompressionStream`. Something like this:

```typescript
// gzip.browser.ts
export const uncompressGzip = async (
  val: BufferSource,
): Promise<Uint8Array<ArrayBuffer>> => {
  const decompressionStream = new DecompressionStream("gzip");
  const response = new Response(decompressionStream.readable);
  const writer = decompressionStream.writable.getWriter();
  return Promise.all([
    response.bytes(),
    writer.write(val),
    writer.close(),
  ]).then((res) => res[0]);
};

// gzip.node.ts
import { promisify } from "node:util";
import { gzip } from "node:zlib";

const gunzipAsync = /* @__PURE__ */ promisify(gunzip);

export const uncompressGzip = async (
  data: BufferSource,
): Promise<Uint8Array<ArrayBuffer>> => {
  const decompressedBuffer = await gunzipAsync(
    // This predicate is necessary because
    // `ArrayBufferView<ArrayBuffer> !== NodeJS.ArrayBufferView<ArrayBuffer>`
    types.isArrayBufferView(data) || types.isArrayBuffer(data)
      ? data
      : Buffer.from(data.buffer, data.byteOffset, data.byteLength),
  );
  // Convert Buffer to Uint8Array
  return new Uint8Array(
    decompressedBuffer.buffer,
    decompressedBuffer.byteOffset,
    decompressedBuffer.byteLength,
  );
};

// index.ts
import { uncompressGzip } from "#gzip";

const uncompressed = await uncompressGzip(
  Uint8Array.fromBase64("H4sIAAAAAAAAE/NIzcnJVwjPL8pJUQQAoxwpHAwAAAA="),
);

console.log(new TextDecoder().decode(uncompressed));
```

```json
{
  "imports": {
    "#gzip": {
      "node": "./gzip.node.js",
      "browser": "./gzip.browser.js",
      "default": "./gzip.browser.js"
    }
  }
}
```

For anyone else where the performance decrease isn't considered meaningful, `DecompressionStream` is probably perfect for you.

In the future, hopefully, other options will be expanded. Brotli is now supported in Firefox 147, Safari 18.4, Bun 1.3.3, Deno 2.7, and Node.js 24.7[^2] (which is somewhat funny, given Google created and maintains that algorithm[^5]), which is a more modern compression algorithm. I would really like a native asynchronous API (probably similar to the [TextEncoder](https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder) in terms of API), but it'll probably be a long time before such a thing exists.

If anyone has any other ideas for performance improvements, please let me know!

<!-- Footnotes -->

[^1]: https://github.com/whatwg/compression/blob/main/explainer.md

[^2]: https://developer.mozilla.org/en-US/docs/Web/API/Compression_Streams_API

[^3]: https://blog.cloudflare.com/a-better-web-streams-api/

[^4]: https://www.golubev.dev/using-decompression-stream/

[^5]: https://github.com/google/brotli
