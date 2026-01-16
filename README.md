# SVG Toolbox

A comprehensive SVG manipulation and analysis library providing capabilities for creating, converting, optimizing, comparing, and analyzing SVG elements.

[![npm version](https://img.shields.io/npm/v/svg-toolbox.svg?style=for-the-badge)](https://www.npmjs.com/package/svg-toolbox)
[![npm downloads](https://img.shields.io/npm/dy/svg-toolbox.svg?style=for-the-badge)](https://www.npmjs.com/package/svg-toolbox)
[![License](https://img.shields.io/github/license/SteamedBread2333/svg-toolbox.svg?style=for-the-badge)](https://www.npmjs.com/package/svg-toolbox)

## Installation

```bash
npm install svg-toolbox
```

## Use Cases

### 1. SVG Element Manipulation

When you need to create, clone, or merge SVG elements in Node.js environments:

- **Dynamic SVG Generation**: Create SVG elements dynamically based on data
- **SVG Template Reuse**: Clone existing SVG elements as templates
- **Combine Multiple SVGs**: Merge multiple independent SVG graphics into one

### 2. Format Conversion

When you need to convert SVG to other formats or perform encoding conversions:

- **Web Application Embedding**: Convert SVG to Base64 data URI for easy embedding in HTML/CSS
- **Image Export**: Convert SVG to PNG, JPG, or WebP formats for download or sharing
- **Cross-platform Compatibility**: Use Base64 encoding when transferring SVG data between different systems

### 3. Visual Regression Testing

When you need to compare SVG rendering results to ensure visual consistency:

- **Automated Testing**: Detect SVG rendering changes in CI/CD pipelines
- **Version Comparison**: Compare differences between different versions of SVG files
- **Quality Assurance**: Ensure SVG modifications don't introduce unexpected visual changes

### 4. SVG Optimization

When you need to clean and optimize SVG code:

- **Performance Optimization**: Remove invalid coordinates and empty attributes to reduce file size
- **Code Cleanup**: Remove comments and excess whitespace to improve readability
- **Data Repair**: Fix path data containing NaN or invalid values

### 5. SVG Analysis

When you need to gain insights into SVG content, the analysis features can help you:

#### Color Extraction Use Cases
- **Design System Building**: Batch analyze SVG icon libraries, extract all used colors, and establish color standards for design systems
- **Theme Adaptation**: Identify colors in SVG and automatically generate dark/light theme versions
- **Accessibility Checking**: Verify that SVG colors meet WCAG contrast requirements
- **Brand Consistency Verification**: Verify that SVG icons use brand standard colors
- **Automated Color Replacement**: Identify colors that need replacement and batch update SVG files

#### Path Analysis Use Cases
- **SVG Optimization Decisions**: Analyze path complexity to determine if simplification or optimization is needed
- **Performance Analysis**: Count path commands to evaluate SVG rendering performance
- **Format Conversion Preparation**: Understand path structure to prepare for conversion to other formats
- **Animation Creation**: Analyze path command types to determine suitable animation methods (e.g., path stroke animation)
- **Quality Detection**: Detect if SVG contains overly complex paths (which may cause performance issues)
- **Path Editing Tools**: Provide path parsing and editing capabilities for SVG editors
- **Learning and Teaching**: Analyze SVG path structure to help understand SVG drawing principles

## Feature Modules

### Core Functions

Provides basic SVG element manipulation capabilities:

- `createSVGElement` - Create SVG element from string
- `cloneSVGElement` - Deep clone SVG element
- `mergeSVGElements` - Merge multiple SVG elements
- `getSVGDimensions` - Get SVG dimensions

### Conversion Functions

Provides format conversion and encoding capabilities:

- `convertSVGToBase64` - Convert SVG to Base64 encoding
- `convertBase64ToSVG` - Decode Base64 to SVG
- `svgToImage` - Convert SVG to image formats (PNG/JPG/WebP)
- `svg2Png` - Convert SVG to PNG (legacy API compatibility)

### Comparison Functions

Provides image comparison and difference detection:

- `diffImages` - Compare two image files and generate diff image
- `pixelLevelDiff` - Pixel-level image difference comparison
- `diffSvg` - SVG difference comparison (legacy API compatibility)

### Optimization Functions

Provides SVG code optimization and cleanup:

- `removeNanCoordinates` - Remove NaN coordinates from paths
- `removeEmptyAttributes` - Remove empty attributes
- `removeComments` - Remove comments
- `normalizeWhitespace` - Normalize whitespace characters
- `optimizeSVG` - Comprehensive SVG code optimization

### Analysis Functions

Provides SVG content analysis:

- `extractColors` - Extract colors used in SVG
- `parsePathData` - Parse path data
- `analyzePaths` - Analyze all path elements
- `getPathStatistics` - Get path statistics

## Usage Examples

### Basic Operations

```typescript
import { createSVGElement, cloneSVGElement, mergeSVGElements } from 'svg-toolbox';

// Create SVG element
const svg = createSVGElement('<svg><circle cx="50" cy="50" r="40" /></svg>');

// Clone element
const cloned = cloneSVGElement(svg);

// Merge multiple elements
const merged = mergeSVGElements([svg, cloned]);
```

### Format Conversion

```typescript
import { convertSVGToBase64, svgToImage } from 'svg-toolbox';

// Convert to Base64
const base64 = convertSVGToBase64('<svg>...</svg>');

// Convert to PNG
const pngBuffer = await svgToImage('input.svg', { scale: 2, format: 'png' });

// Convert to WebP
const webpBuffer = await svgToImage('input.svg', { format: 'webp', quality: 90 });
```

### Image Comparison

```typescript
import { diffImages } from 'svg-toolbox';

// Compare two images and generate diff image
const result = await diffImages('image1.svg', 'image2.svg', 'diff.png');
console.log(`Number of different pixels: ${result.numDiffPixels}`);
```

### SVG Optimization

```typescript
import { optimizeSVG, removeNanCoordinates } from 'svg-toolbox';

// Comprehensive optimization
const optimized = optimizeSVG('<svg><!-- comment --><path d="M 10,20 nan L 30,40" /></svg>');

// Remove NaN coordinates
const cleaned = removeNanCoordinates('<svg><path d="M 10,20 nan L 30,40" /></svg>');
```

### Content Analysis

```typescript
import { extractColors, getPathStatistics } from 'svg-toolbox';

// Extract colors
const colors = extractColors('<svg><circle fill="red" stroke="blue" /></svg>');

// Get path statistics
const stats = getPathStatistics('<svg><path d="M 10,20 L 30,40 Z" /></svg>');
console.log(`Paths: ${stats.totalPaths}, Commands: ${stats.totalCommands}`);
```

## API Documentation

For detailed API documentation, please refer to [TypeScript type definitions](./src/types/index.ts) and source code comments.

## Development

```bash
# Install dependencies
npm install

# Run tests
npm test

# Build project
npm run build

# Watch mode testing
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## License

MIT License
