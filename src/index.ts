/**
 * SVG Toolbox - A comprehensive library for SVG manipulation and analysis
 * 
 * @module svg-toolbox
 */

// Core element manipulation
export {
  createSVGElement,
  cloneSVGElement,
  mergeSVGElements,
  serializeSVG
} from './core/element';

export { getSVGDimensions } from './core/dimensions';

// Conversion utilities
export {
  convertSVGToBase64,
  convertBase64ToSVG
} from './convert/base64';

export {
  svgToImage,
  svg2Png
} from './convert/image';

// Comparison utilities
export {
  pixelLevelDiff,
  diffImages,
  diffSvg
} from './compare/diff';

// Optimization utilities
export {
  removeNanCoordinates
} from './optimize/path';

export {
  removeEmptyAttributes,
  removeComments,
  normalizeWhitespace,
  optimizeSVG
} from './optimize/cleanup';

// Analysis utilities
export {
  extractColors
} from './analyze/colors';

export {
  parsePathData,
  analyzePaths,
  getPathStatistics
} from './analyze/paths';

// Validation utilities
export {
  isValidSvgString,
  isValidSvgElement
} from './utils/validation';

// Types
export type {
  SVGDimensions,
  DiffResult,
  ConversionOptions,
  PathCommand,
  SVGColor
} from './types';

// Legacy exports for backward compatibility
export { removeNanCoordinates as removeEmptyCoordinates } from './optimize/path';
