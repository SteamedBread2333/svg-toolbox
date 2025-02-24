<h1 align="center">
  <br/>
    <img width="200" alt="image" src="https://github.com/user-attachments/assets/42bba668-a79c-4d2a-b3ac-393c0c140923" />
  <br/>
</h1>


# SVG Utility Functions
This module provides utility functions for working with SVG elements and files, including creating, cloning, merging, converting SVG to Base64, comparing SVG images, normalizing path data, and converting SVG to PNG format.

[![npm version](https://img.shields.io/npm/v/svg-toolbox.svg?style=for-the-badge)](https://www.npmjs.com/package/svg-toolbox)
[![npm downloads](https://img.shields.io/npm/dy/svg-toolbox.svg?style=for-the-badge)](https://www.npmjs.com/package/svg-toolbox)
[![deps](https://img.shields.io/github/license/SteamedBread2333/svg-toolbox.svg?style=for-the-badge)](https://www.npmjs.com/package/svg-toolbox)

## Installation
```bash
npm install svg-toolbox
```

## Table of Contents

- [SVG Utility Functions](#svg-utility-functions)
  - [Installation](#installation)
  - [Table of Contents](#table-of-contents)
  - [Usage](#usage)
    - [createSVGElement](#createsvgelement)
    - [cloneSVGElement](#clonesvgelement)
    - [mergeSVGElements](#mergesvgelements)
    - [convertSVGToBase64](#convertsvgtobase64)
    - [convertBase64ToSVG](#convertbase64tosvg)
    - [diffSvg](#diffsvg)
    - [svg2png](#svg2png)
    - [removeNanCoordinates](#removenancoordinates)
  - [License](#license)

## Usage

### createSVGElement

Creates an SVG element from a given SVG content string.

```typescript
const svgElement = createSVGElement(`<svg><path d="M10 20L30 40Z" /></svg>`);
console.log(svgElement);
```
### cloneSVGElement

Clones an SVG element deeply.

```typescript
import { cloneSVGElement } from 'svg-toolbox';
import { JSDOM } from 'jsdom';

const dom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`);
const { document } = dom.window;

const originalElement = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
originalElement.setAttribute('cx', '50');
originalElement.setAttribute('cy', '50');
originalElement.setAttribute('r', '40');
originalElement.setAttribute('stroke', 'black');
originalElement.setAttribute('stroke-width', '3');
originalElement.setAttribute('fill', 'red');

const clonedElement = cloneSVGElement(originalElement);
console.log(clonedElement);
```

### mergeSVGElements
Merges multiple SVG elements into a single SVG element.

```typescript
import { mergeSVGElements } from 'svg-toolbox';
import { JSDOM } from 'jsdom';

const dom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`);
const { document } = dom.window;

const svgElement1 = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
svgElement1.setAttribute('cx', '50');
svgElement1.setAttribute('cy', '50');
svgElement1.setAttribute('r', '40');
svgElement1.setAttribute('stroke', 'black');
svgElement1.setAttribute('stroke-width', '3');
svgElement1.setAttribute('fill', 'red');

const svgElement2 = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
svgElement2.setAttribute('x', '10');
svgElement2.setAttribute('y', '10');
svgElement2.setAttribute('width', '100');
svgElement2.setAttribute('height', '100');
svgElement2.setAttribute('fill', 'blue');

const mergedElement = mergeSVGElements([svgElement1, svgElement2]);
console.log(mergedElement);
```

### convertSVGToBase64
Converts an SVG element or SVG string to a Base64-encoded string.

```typescript
import { createSVGElement, convertSVGToBase64, convertBase64ToSVG } from 'svg-toolbox';

const svgElement = createSVGElement(`<svg><path d="M10 20L30 40Z" /></svg>`);

const base64String = convertSVGToBase64(svgElement);
console.log('convertSVGToBase64 param element', base64String);

const svgString = convertBase64ToSVG(base64String);
console.log('convertBase64ToSVG', svgString);

const svgBase64 = convertSVGToBase64(svgString);
console.log('convertSVGToBase64 param string', svgBase64);
```

### convertBase64ToSVG
Converts a Base64-encoded string back to an SVG string.

```typescript
import { convertBase64ToSVG } from 'svg-toolbox';

const base64String = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjQwIiBzdHJva2U9ImJsYWNrIiBzdHJva2Utd2lkdGg9IjMiIGZpbGw9InJlZCIgLz48L3N2Zz4=';
const svgString = convertBase64ToSVG(base64String);
console.log(svgString);
```

### diffSvg
Compares two PNG images and generates a diff image.

```typescript
import { diffSvg } from 'svg-toolbox';

const pathA = 'path/to/first/image.png';
const pathB = 'path/to/second/image.png';
const diffFilePath = 'path/to/save/diff/image.png';

// diffPngBuffer is a Buffer object containing the diff image in PNG format.
// numDiffPixels is the number of different pixels between the two images.
const { diffPngBuffer, numDiffPixels } = await diffSvg(pathA, pathB, diffFilePath)
const diffPngBase64 = `data:image/png;base64,${diffPngBuffer.toString('base64')}`;
console.log(`Number of different pixels: ${numDiffPixels}`);
```

### svg2png
Converts an SVG file to PNG format.

```typescript
// Callback/Promise
import { svg2Png } from 'svg-toolbox';

const svgPath = 'path/to/input/image.svg';
const pngPath = 'path/to/output/image.png';
const scale = 2; // Scaling factor

svg2Png(svgPath, pngPath, scale);

// Async/await
const pngBuffer = await svg2Png(svgPath, scale);
const pngBase64 = `data:image/png;base64,${pngBuffer.toString('base64')}`;
console.log(pngBase64);
```

### removeNanCoordinates
Parses and normalizes the d attribute of all path elements in an SVG content.

```typescript
import { removeNanCoordinates } from 'svg-toolbox';

const svgContent = `<svg><path d="M 10,20 nan L 30,40 -nan Z" /></svg>`;
const normalizedSvgContent = removeNanCoordinates(svgContent);
console.log(normalizedSvgContent);

```

## License
MIT License
