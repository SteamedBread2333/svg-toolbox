# svg-toolbox
This library provides some SVG-related tools

[![npm version](https://img.shields.io/npm/v/svg-toolbox.svg?style=flat-square)](https://www.npmjs.com/package/svg-toolbox)
[![npm downloads](https://img.shields.io/npm/dt/svg-toolbox.svg?style=flat-square)](https://www.npmjs.com/package/svg-toolbox)
[![deps](https://img.shields.io/github/license/SteamedBread2333/svg-toolbox.svg)](https://www.npmjs.com/package/svg-toolbox)

## Installation
```bash
npm install svg-toolbox
```
## Usage
```typescript
const { svg2png } = require('svg-toolbox')

...
svg2png(svgPath, pngSavePath, x)
...
```

```typescript
const { diffSvg } = require('svg-toolbox')

...
const { 
  diffPngBuffer,
  numDiffPixels
}:Promise<{
  diffPngBuffer: Buffer<ArrayBufferLike>
  numDiffPixels: number
} | void> = await diffSvg(svgPath1, svgPath2, diffResultSavePath)
const diffPngBase64 = `data:image/png;base64,${diffPngBuffer.toString('base64')}`;
...
```

```typescript
const { removeEmptyCoordinates } = require('svg-toolbox')

...
const modifiedSvgContent: string = removeEmptyCoordinates(svgContent)
...
```
