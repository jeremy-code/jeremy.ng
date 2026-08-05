---
title: Working with files/blobs in TanStack React Query
lede: Hashing files/blobs for proper caching in React Query
authors:
  - name: Jeremy Nguyen
tags:
  - react
  - react-query
mastodonId: "117041195387227039"
---

<!-- Originally posted on https://gist.github.com/jeremy-code/8ca2001db0b30c5935fa303727c06fe5 -->

If you're working with a `File` or `Blob` object in JavaScript, you can't really do much with them besides read their size and type unless you use one of its methods (e.g. `bytes`, `arrayBuffer`, `slice`, `stream`, `text`), all of which (besides `stream`) return a `Promise`.[^1]

For me, in React, if I'm expected to handle a `Promise`, my mind gravitates to either [React Query](https://github.com/tanstack/query) or [SWR](https://github.com/vercel/swr). My go-to reaction would be to write something like the following:

```tsx
import { useQuery } from "@tanstack/react-query";

const Component = ({ file }: { file: File }) => {
  const { data: arrayBuffer } = useQuery({
    queryKey: ["Component", file],
    queryFn: () => file.arrayBuffer(),
  });
  // ...
};
```

The thing is, the part of React Query that is usually the most meaningful for queries is the ability to cache queries, which is done via a `queryKey` array.[^2] However, since query keys in React Query are serialized into strings using `JSON.stringify` by default,[^2] your `queryKey` would end up looking like this: `["Component",{}]`.

The most straightforward "solution" that usually ensures better caching behavior is to simply use the properties available as a `queryKey`.

```tsx
import { useQuery } from "@tanstack/react-query";

const serializeFile = (file: File) => {
  return {
    lastModified: file.lastModified,
    name: file.name,
    webkitRelativePath: file.webkitRelativePath,
    size: file.size,
    type: file.type,
  };
};

const Component = ({ file }: { file: File }) => {
  const { data: arrayBuffer } = useQuery({
    queryKey: ["Component", serializeFile(file)],
    queryFn: () => file.arrayBuffer(),
  });
  // ...
};
```

However, this really isn't ideal for a couple of reasons. For one, in `Blob`s, only the `size` and `type` properties are available, which really aren't that unique of an identifier. `lastModified` in `File`s also just returns the current time by default, so that also may be too unique of an identifier. Furthermore, there are doubtless a number of possible collisions that can occur with this kind of setup.

The solution, it seems, would be to hash the `File`, somehow, and use that as the `queryKey`. An algorithm like SHA-256 would be collision-resistant and help prevent doing extra work that was already cached.

While `queryKeyHashFn` does exist as a property, it seems to only accept synchronous functions.[^3] The vast majority of hashing functions seem to be asynchronous, including the web default [`SubtleCrypto.digest`](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest), so I suspect this is a non-starter.

My first thought was to simply use `useEffect`, which compares directly by reference.[^4] Below is a more simplified version of [this file](https://github.com/jeremy-code/exifi/blob/bd8398e3ddac172ccee1564e32de86ee317b6e24/apps/client/src/hooks/useFileHash.tsx).

```tsx
import { useEffect, useState } from "react";

import { sha256 } from "hash-wasm";

type UseFileHashResult = {
  fileHash: string | null;
  isPending: boolean;
  error: Error | null;
};

export const useFileHash = (
  file: File | undefined | null,
): UseFileHashResult => {
  const [fileHashState, setFileHashState] = useState<UseFileHashResult>(() =>
    !file ?
      { fileHash: null, isPending: false, error: null }
    : { fileHash: null, isPending: true, error: null },
  );

  useEffect(() => {
    if (!file) {
      return;
    }

    const abortController = new AbortController();

    const computeHash = async () => {
      setFileHashState({ fileHash: null, isPending: true, error: null });
      try {
        const fileInBytes = await file.bytes();
        const fileHash = await sha256(fileInBytes);
        if (abortController.signal.aborted) {
          return;
        }
        setFileHashState({ fileHash, isPending: false, error: null });
      } catch (error) {
        if (abortController.signal.aborted) {
          return;
        }
        setFileHashState({
          fileHash: null,
          isPending: false,
          error: error instanceof Error ? error : new Error(String(error)),
        });
      }
    };

    void computeHash();
    return () => abortController.abort();
  }, [file]);

  return fileHashState;
};
```

In which case, you would use it like this:

```tsx
import { useQuery } from "@tanstack/react-query";

import { useFileHash } from "./useFileHash";

const Component = ({ file }: { file: File }) => {
  const { fileHash } = useFileHash(file);
  const { data: arrayBuffer } = useQuery({
    queryKey: ["Component", fileHash],
    queryFn: () => file.arrayBuffer(),
    enabled: !!fileHash,
  });

  return <div>{arrayBuffer ? "Loaded" : "Loading..."}</div>;
};
```

It works... but I'm not really a fan. I have been mostly using React Query's `useSuspsenseQuery` where setting `enabled` is not possible.[^5] Furthermore, the code is a bit too verbose and overengineered for something that should be fairly simple.

Alternatively, I tried using React 19's `use` hook. Since I wasn't using React Server Components, this meant I had to pass the promise from a parent component.

```tsx
import { Suspense, use } from "react";

import { useQuery } from "@tanstack/react-query";
import { sha256 } from "hash-wasm";

const Parent = ({ file }: { file: File }) => {
  const fileHashPromise = file
    .bytes()
    .then((fileInBytes) => sha256(fileInBytes));

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Child file={file} fileHashPromise={fileHashPromise} />
    </Suspense>
  );
};

const Child = ({
  file,
  fileHashPromise,
}: {
  file: File;
  fileHashPromise: Promise<string>;
}) => {
  const fileHash = use(fileHashPromise);
  const { data: arrayBuffer } = useSuspenseQuery({
    queryKey: ["Child", fileHash],
    queryFn: () => file.arrayBuffer(),
  });
  // ...
};
```

Since I already have `Suspense` around my components due to using `useSuspenseQuery`, I thought this approach was better and less intrusive. Still, it is a bit frustrating to have the strange nested structure, especially since it's only dependent on the `file` prop.

As a quick aside, it does raise the question: why doesn't this work?

```tsx
const Child = ({ file }: { file: File }) => {
  const fileHash = use(file.bytes().then((fileInBytes) => sha256(fileInBytes)));
  // ...
};
```

If you were to do something like this, the component would infinitely re-render. More specifically, in the React documentation, it notes that "Promises created in Client Components are recreated on every render.[^6]"

So, what if we were to make sure the `Promise` was stable?

The React documentation references creating a promise cache as a useful option for library authors,[^7] so it seems like a viable pattern.

One concern is that using a regular `Map` would result in the File not being garbage collected even after you are done with it. However, we can instead use a [WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap), which avoids this specific problem.[^8]

```tsx
import { use } from "react";

import { useSuspenseQuery } from "@tanstack/react-query";
import { sha256 } from "hash-wasm";

const blobHashPromiseCache = new WeakMap<Blob, Promise<string>>();

const getBlobHashPromise = (blob: Blob) => {
  let blobHashPromise = blobHashPromiseCache.get(blob);
  if (blobHashPromise === undefined) {
    blobHashPromise = blob.bytes().then((blobInBytes) => sha256(blobInBytes));
    blobHashPromiseCache.set(blob, blobHashPromise);
  }
  return blobHashPromise;
};

const Child = ({ file }: { file: File }) => {
  const fileHash = use(getBlobHashPromise(file));
  const { data: arrayBuffer } = useSuspenseQuery({
    queryKey: ["Child", fileHash],
    queryFn: () => file.arrayBuffer(),
  });
  // ...
};
```

This does seem to work, and it has been what I have been using for my application. Here is my complete [useFileHash.tsx](https://github.com/jeremy-code/exifi/blob/main/apps/client/src/hooks/useFileHash.tsx) (and accompanying [unit tests](https://github.com/jeremy-code/exifi/blob/main/apps/client/src/hooks/useFileHash.test.tsx)) at the time of writing, if you are curious.

One minor caveat is that you may also want to add the properties `.name` and `.lastModified` to your `queryKey` if those are important to your processing, as this only generates a SHA-256 hash of the file's contents.

I can also foresee other concerns that may be meaningful. For one, `getBlobHashPromise` is not a pure function, which may lead to unpredictable behavior or bugs. Furthermore, the cache being stored at the module level may have implications or consequences. Nonetheless, for my use case, it has been working well.

<!-- Footnotes -->

[^1]: https://developer.mozilla.org/en-US/docs/Web/API/Blob#instance_methods

[^2]: https://tanstack.com/query/latest/docs/framework/react/guides/query-keys

[^3]: https://tanstack.com/query/latest/docs/framework/react/reference/useQuery#:~:text=collection-,queryKeyHashFn

[^4]: https://react.dev/reference/react/useEffect#:~:text=React%20will%20compare%20each%20dependency%20with%20its%20previous%20value%20using%20the%20Object%2Eis%20comparison%2E

[^5]: https://tanstack.com/query/latest/docs/framework/react/guides/suspense#:~:text=you%20therefore%20can%27t%20conditionally%20enable%20%2F%20disable%20the%20Query

[^6]: https://react.dev/reference/react/use#promises-must-cached

[^7]: https://react.dev/reference/react/use#how-to-implement-a-promise-cache

[^8]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap
