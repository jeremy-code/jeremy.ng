---
title: Exporting images with transparency with PDF.js and Sharp
lede: Export PNG files with transparency using PDF.js and Sharp on Node.js
authors:
  - name: Jeremy Nguyen
tags:
  - pdf
  - nodejs
mastodonId: "117166051263733577"
---

<!-- Originally posted on https://gist.github.com/jeremy-code/b46ada0c3f6e1f7e4d57fde87cde795e -->

The `pdfimages` CLI tool (or at the very least, the `poppler` variant) seems to only be able to extract images with transparency from PDFs by exporting the original image and its alpha transparency mask. This is documented in their manual,[^1] although I am not certain whether it is because of the software itself or some quirk of PDF rendering itself.[^2]

Nonetheless, since I had a significant number of images to process, I wrote a Node.js script to do this.

Sharp is probably overkill for this, but it was the simplest way to export the images as PNGs. I am using `pdf-js` with their legacy build since I am running the script using Node.js.[^3] Installing `node-canvas` was not necessary.

```typescript
import { mkdir } from "node:fs/promises";

import {
  getDocument,
  ImageKind,
  OPS,
  type PDFPageProxy,
} from "pdfjs-dist/legacy/build/pdf.mjs";
import sharp from "sharp";

const OUTPUT_DIR = "output";
const PDF_PATH = "/path/to/pdf";

await mkdir(OUTPUT_DIR, { recursive: true });

const document = await getDocument({ url: PDF_PATH }).promise;

// PDFObjects.get() is typed as any, but this is the output type I have observed
// in practice
interface _ImageObject {
  width: number;
  height: number;
  interpolate: undefined;
  kind: 1 | 2 | 3; // ImageKind https://github.com/mozilla/pdf.js/blob/022e9588728346cde58088a9925120293af1c8f4/src/shared/util.js#L137
  data: Uint8ClampedArray;
  dataLen: number;
  ref: `${number}R`;
}

const getImageObjectsInPage = async (
  page: PDFPageProxy,
): Promise<Record<string, any>> => {
  const operatorList = await page.getOperatorList();
  const imageIndices = operatorList.fnArray.flatMap((fn, index) =>
    fn === OPS.paintImageXObject ? [index] : [],
  );
  const imageIds: string[] = imageIndices.map(
    (index) => operatorList.argsArray[index][0],
  );
  const imageObjectEntries = imageIds
    .filter((imageId) => page.objs.has(imageId) || page.commonObjs.has(imageId))
    .map((imageId) =>
      imageId.startsWith("g_") ?
        [imageId, page.commonObjs.get(imageId)]
      : [imageId, page.objs.get(imageId)],
    );

  return Object.fromEntries(imageObjectEntries);
};

const convertImageObjectToSharp = (imageObject: any) => {
  return sharp(imageObject.data, {
    raw: {
      width: imageObject.width,
      height: imageObject.height,
      channels:
        imageObject.kind === ImageKind.GRAYSCALE_1BPP ? 1
        : imageObject.kind === ImageKind.RGB_24BPP ? 3
        : imageObject.kind === ImageKind.RGBA_32BPP ? 4
        : 3,
    },
  });
};

const imagePromises = Array.from({ length: document.numPages }).map(
  async (_, pageIndex) => {
    const page = await document.getPage(pageIndex + 1);
    const imageObjectsById = await getImageObjectsInPage(page);

    return Promise.all(
      Object.entries(imageObjectsById).map(([imageId, imageObject], index) =>
        convertImageObjectToSharp(imageObject).toFile(
          `output/page-${pageIndex}-img-${index}-id-${imageId}.png`,
        ),
      ),
    );
  },
);

await Promise.all(imagePromises);
```

<!-- Footnotes -->

[^1]: https://gitlab.freedesktop.org/poppler/poppler/-/blob/7ef1185be1e5431c1d75b12480e83ce3c181728c/utils/pdfimages.1#L135-136

[^2]: For more information on how transparency is handled in PDFs, see https://blog.adobe.com/en/publish/2022/01/31/20-years-of-transparency-in-pdf.

[^3]: https://github.com/mozilla/pdf.js/wiki/Frequently-Asked-Questions#legacy-build
