# svg-toolbox
This library provides some SVG-related tools

## Installation
```bash
npm install svg-toolbox
```
## Usage
```js
const { svg2png } = require('svg-toolbox')

...
svg2png(svgPath, pngSavePath, x)
...
```

```js
const { diffSvg } = require('svg-toolbox')

...
diffSvg(svgPath1, svgPath2, diffResultSavePath)
...
```

```js
const { removeEmptyCoordinates } = require('svg-toolbox')

...
const mData = removeEmptyCoordinates(svgContent)
...
```