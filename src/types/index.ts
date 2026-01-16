/**
 * Type definitions for SVG Toolbox
 */

export interface SVGDimensions {
  width: number;
  height: number;
  viewBox?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export interface DiffResult {
  diffPngBuffer: Buffer;
  numDiffPixels: number;
}

export interface ConversionOptions {
  scale?: number;
  format?: 'png' | 'jpg' | 'jpeg' | 'webp';
  quality?: number;
}

export interface PathCommand {
  type: string;
  params: number[];
}

export interface SVGColor {
  fill?: string;
  stroke?: string;
  opacity?: number;
}
