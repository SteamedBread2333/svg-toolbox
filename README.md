<h1 align="center">
  <br/>
    <img width="200" alt="image" src="https://github.com/user-attachments/assets/5fb4fbd0-10b4-4abf-93fd-d98b17845f34" />
  <br/>
</h1>


# SVG Utility Functions
This module provides utility functions for working with SVG elements and files, including creating, cloning, merging, converting SVG to Base64, comparing SVG images, normalizing path data, and converting SVG to PNG format.

[![npm version](https://img.shields.io/npm/v/svg-toolbox.svg?style=flat-square)](https://www.npmjs.com/package/svg-toolbox)
[![npm downloads](https://img.shields.io/npm/dt/svg-toolbox.svg?style=flat-square)](https://www.npmjs.com/package/svg-toolbox)

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
    - [removeNanCoordinates](#removenancoordinates)
    - [svg2png](#svg2png)
  - [License](#license)

## Usage

### createSVGElement

Creates an SVG element from a given SVG content string.

```typescript
import { createSVGElement } from 'svg-toolbox';

const svgContent = `<circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />`;
const svgElement = createSVGElement(svgContent);
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
import { convertSVGToBase64 } from 'svg-toolbox';
import { JSDOM } from 'jsdom';

const dom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`);
const { document } = dom.window;

const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
svgElement.setAttribute('cx', '50');
svgElement.setAttribute('cy', '50');
svgElement.setAttribute('r', '40');
svgElement.setAttribute('stroke', 'black');
svgElement.setAttribute('stroke-width', '3');
svgElement.setAttribute('fill', 'red');

const base64String = convertSVGToBase64(svgElement);
console.log(base64String);
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

diffSvg(pathA, pathB, diffFilePath)
  .then(({ diffPngBuffer, numDiffPixels }) => {
    console.log(`Number of different pixels: ${numDiffPixels}`);
  })
  .catch(error => {
    console.error('Error generating diff image:', error);
  });
```

### removeNanCoordinates
Parses and normalizes the d attribute of all path elements in an SVG content.

```typescript
import { removeNanCoordinates } from 'svg-toolbox';

const svgContent = `<svg><path d="M 10,20 nan L 30,40 -nan Z" /></svg>`;
const normalizedSvgContent = removeNanCoordinates(svgContent);
console.log(normalizedSvgContent);

```

### svg2png
Converts an SVG file to PNG format.

```typescript
import { svg2Png } from 'svg-toolbox';

const svgPath = 'path/to/input/image.svg';
const pngPath = 'path/to/output/image.png';
const scale = 2; // Scaling factor

svg2Png(svgPath, pngPath, scale);
```

## License
MIT License
