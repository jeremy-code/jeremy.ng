---
title: Loading arbitrary binary data with WebAssembly modules
lede: Using source phase imports to load arbitrary binary data with WebAssembly module custom sections
authors:
  - name: Jeremy Nguyen
tags:
  - webassembly
  - javascript
mastodonId: "117494067461225505"
publishedDate: "2026-10-24T04:50:03Z"
---

Have you ever wanted to "import" a non-JavaScript/JSON file? Right now, there exists a TC39 proposal to add the ["bytes" import attribute](https://github.com/tc39/proposal-import-bytes) to ECMAScript. As of October 2026, the proposal is currently sitting in Stage 2.7. In theory, it would let you import any arbitrary bytes as a Uint8Array across all JavaScript environments.[^1] The feature is currently supported by Deno,[^2] and no one else as far as I know. Given that the similar "text" import attribute, which currently sits in Stage 3,[^3] is still unsupported by Safari,[^4] it'll be probably take some time for this to be an accessible feature for most JavaScript developers.

An alternative to this would be to use a runtime API like `node:fs/promises.readFile` or fetch (note that in Node.js, the fetch API does not work with file URLs)[^5]. The former is not ideal for bundlers since you can't statically analyze code that requires runtime checks; it also makes portability and isomorphic code signficantly more difficult.

Another alternative is to simply encode the binary as Base64, which also has its own set of complications. Base64 encoding by itself already increases file size by a factor of 4/3. Compression after the fact is also difficult because compressing already Base64-encoded text also tends to yield poor results.[^6] Thirdly, using a string as an intermediary has dubious semantics in JavaScript. Since most runtimes (v8,[^7] SpiderMonkey,[^8] JavaScriptCore[^9]) optimize ASCII-only strings, the typical runtime cost of storing two bytes per character in UTF-16 is usually not a concern. Still, the way engines like v8 optimize strings is a complicated subject.[^10][^11] A `TypedArray` is well-optimized by JavaScript engines[^12] and is a more meaningful representation of binary data, so this would be preferred over a string intermediary.

## WebAssembly modules

[Source phase imports](https://github.com/tc39/proposal-source-phase-imports) is a proposal, currently at stage 3, that would allow you to import a `.wasm` file as a [`WebAssembly.Module`](https://developer.mozilla.org/en-US/docs/WebAssembly/Reference/JavaScript_interface/Module) using the syntax `import source`.[^13] It honestly doesn't have great support in browsers, being only supported on a opt-in basis on Firefox,[^14][^15] but it is supported as of Node.js v24.0.0.[^16] It also, unfortunately, isn't supported by TypeScript either.[^17] It does have Babel support.[^18] However, this may not be an awful fix for our problem. After all, WebAssembly modules are already natively stored as binary data.[^19] `import source` being also being a static import declaration means that it should be easy for bundlers to handle, though I do not know yet of any bundlers that can handle this syntax.

The very first problem is to somehow geti binary data out of a WebAssembly module. My initial idea was very silly and relied on manipulating the bytes of a pointer in runtime with an exported function. This clearly would not work in practice since it would include much overhead and be very annoying to use.

In the WebAssembly binary specification, there includes a section for arbitrary data ("custom sections").[^20] The most common use for this is for a custom "name section" to provide names for all the functions, locals, and parameters.[^21] The most important part is that the bytes are left uninterpreted.[^20] Furthermore, we can read this custom section in a WebAssembly.Module using [`WebAssembly.Module.customSections`](https://developer.mozilla.org/en-US/docs/WebAssembly/Reference/JavaScript_interface/Module/customSections_static), which has surprisingly excellent support being baseline October 2017.[^22] The length of a WebAssembly section is stored as `uint32`,[^23] which means our file can be a maximum of 2^32-1 bytes (about 4.000 GiB).

Unfortunately, since the WebAssembly text format doesn't currently have a syntax for adding custom sections,[^22] we will have to generate this programmatically with a script. While a direct implementation would actually be relatively straightforward—the most complicated part being the [LEB128](https://en.wikipedia.org/wiki/LEB128) encoding—to simplify generation, let's instead just use the npm library [binaryen.js](https://github.com/AssemblyScript/binaryen.js/) by AssemblyScript. Let's call the custom section "dat" as a nod to [.dat files](https://www.adobe.com/uk/acrobat/resources/document-files/data-files/dat.html) and because the name length does matter in terms of bytes.

```typescript
import { readFile, writeFile } from "node:fs/promises";

import binaryen from "binaryen";

const module = new binaryen.Module();
module.addCustomSection("dat", await readFile("./input.bin"));
const binary = module.emitBinary();
if (!WebAssembly.validate(binary)) {
  throw new Error("Invalid WebAssembly binary emitted!");
}
await writeFile("./output.wasm", module.emitBinary());
```

Now, to retrieve the data using a source phase import and the [`WebAssembly.Module.customSections`](https://developer.mozilla.org/en-US/docs/WebAssembly/Reference/JavaScript_interface/Module/customSections_static) function:

```typescript
import source mod from "../dist/output.wasm";

export const getWebAssemblyData = (): Uint8Array<ArrayBuffer> => {
  // @ts-expect-error -- Source phase imports are not supported https://github.com/microsoft/TypeScript/issues/61216
  const datSections = WebAssembly.Module.customSections(mod, "dat");
  if (datSections.length === 0) {
    throw new Error("No WebAssembly dat section found!");
  }
  return new Uint8Array(datSections[0]!);
};
```

And that's it! You could even make it a one-liner without the length check. After generation, the WebAssembly binary is sixteen bytes more than the original file's size (312.03125 KiB). The reason for this is the WebAssembly magic numbers/header (eight bytes), the name length of 3 (one byte), the name (three bytes), section id of 0 (one byte), and the length of the section encoded in LEB128 (3 bytes). Still, this a tiny price to pay compared to the 4/3 times size increase when Base64 encoding.

## Performance

Firstly, for simplicity's sake, let's just measure the execution time of this technique compared with the classic loading from a Base64 string. The test file will be an image of [this nearby planet](https://commons.wikimedia.org/wiki/File:Meteosat-12-fci-march-equinox-2025-noon.jpg) after being compressed somewhat with [Squoosh.app](https://squoosh.app/). The WebAssembly file is 312.0469 KiB while its Base64-encoded string is 426,029 characters long. The code here will be provided at this [GitHub repository](https://github.com/jeremy-code/wasm-custom-sections).

I'll be using the somewhat newer [`Uint8Array.fromBase64`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array/fromBase64), so this should be the most efficient Base64 decoding possible. Here are the first ten runs, counting the time spent on each function call on a MacBook M1 on Node.js v26.11.1.

| Index | WebAsssembly (ms) | Base64 (ms) |
| :---: | :---------------: | :---------: |
|   1   |       4.491       |   10.970    |
|   2   |       4.314       |   10.793    |
|   3   |       3.373       |    5.774    |
|   4   |       3.494       |    5.011    |
|   5   |       3.515       |    5.352    |
|   6   |       4.024       |    5.368    |
|   7   |       3.258       |    6.344    |
|   8   |       3.307       |    4.954    |
|   9   |       3.420       |    6.167    |
|  10   |       4.450       |   10.869    |

It seems that the WebAssembly had the advantage on cold starts, but once the engine decided to optimize the Base64 decoding, the margin between the two shrunk. More analysis is required.

Let's run benchmarks. This will be on the same hardware, but with tiny-bench and Vitest. The default settings will be used except that `subtractTimerOverhead` will be enabled.

| name               |        hz |   min |    max |   mean |    p75 |    p99 |   p995 |   p999 |    rme | samples |
| ------------------ | --------: | ----: | -----: | -----: | -----: | -----: | -----: | -----: | -----: | ------: |
| getWebAssemblyData | 35,597.29 | 0.017 | 5.9981 | 0.0467 | 0.0514 | 0.2596 | 0.3795 | 2.0695 | ±3.22% |   21365 |
| getBase64Data      | 15,460.90 | 0.048 | 9.4943 | 0.0946 | 0.0905 | 0.4512 | 0.7307 |   2.73 | ±4.06% |   10560 |

Again, importing WebAssembly modules seems to have the advantage, having a little more than double the throughput of its Base64-encoded counterpart.

While more tests are required, my guess is that the performance improvement is a combination of either (1) `WebAssembly.Module` being an easier format for the engine to optimize compared to string and (2) the runtime cost of compiling a WebAssembly module being signficantly less compared to the runtime cost of decoding a Base64-encoded string.

## Conclusion

Clearly, given the last of general support for source path imports, this technique is not viable currently. However, in the near future, this could simplify bundlers handling server code significantly. One use case I can imagine for this is in Cloudflare Workers, who already have implemented importing WebAssembly as a [WebAssembly.Module](https://developer.mozilla.org/en-US/docs/WebAssembly/Reference/JavaScript_interface/Module). Since edge runtimes usually don't have actual filesystems, this may be a way to handle certain tasks like importing images or fonts to generate OG images.

[^1]: https://github.com/tc39/proposal-import-bytes

[^2]: https://docs.deno.com/examples/importing_bytes/

[^3]: https://github.com/tc39/proposal-import-text

[^4]: https://caniuse.com/wf-text-modules

[^5]: https://github.com/nodejs/undici/issues/2751

[^6]: https://peterchng.com/blog/2023/10/28/compression-of-base64/

[^7]: https://iliazeus.lol/articles/js-string-optimizations-en/

[^8]: https://firefox-source-docs.mozilla.org/xpcom/stringguide.html

[^9]: https://trac.webkit.org/wiki/EfficientStrings

[^10]: https://iliazeus.lol/articles/js-string-optimizations-en/

[^11]: In practice, I noticed that Base64-encoded strings are represented as `InternalizedOneByteString` in v8. For more information on v8 strings, see https://blog.frontend-almanac.com/v8-strings.

[^12]: https://web.dev/articles/webgl-typed-arrays#design_considerations

[^13]: https://github.com/tc39/proposal-source-phase-imports

[^14]: https://caniuse.com/mdn-javascript_statements_import_import_source_import_wasm_modules

[^15]: https://developer.mozilla.org/en-US/docs/Mozilla/Firefox/Releases/153#javascript

[^16]: https://nodejs.org/en/blog/release/v24.0.0#semver-minor-commits

[^17]: https://github.com/microsoft/TypeScript/issues/61216

[^18]: https://babeljs.io/docs/babel-plugin-proposal-import-wasm-source

[^19]: https://webassembly.github.io/spec/core/binary/modules.html

[^20]: https://webassembly.github.io/spec/core/binary/modules.html#custom-section

[^21]: https://webassembly.github.io/spec/core/appendix/custom.html

[^22]: https://developer.mozilla.org/en-US/docs/WebAssembly/Reference/JavaScript_interface/Module/customSections_static

[^23]: https://webassembly.github.io/spec/core/binary/modules.html#sections
