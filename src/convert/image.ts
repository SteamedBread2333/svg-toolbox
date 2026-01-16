/**
 * SVG to image format conversion utilities
 */

import fs from 'fs';
import sharp from 'sharp';
import { getSVGDimensions } from '../core/dimensions';
import { ConversionOptions } from '../types';

/**
 * Converts an SVG file to PNG format
 * 
 * @param svgPath - Path to the SVG file
 * @param options - Conversion options including scale, format, and quality
 * @returns Promise resolving to a Buffer containing the converted image
 */
export async function svgToImage(
  svgPath: string,
  options: ConversionOptions = {}
): Promise<Buffer> {
  const { scale = 2, format = 'png', quality = 90 } = options;
  
  if (!fs.existsSync(svgPath)) {
    throw new Error(`SVG file not found: ${svgPath}`);
  }
  
  const svgContent = fs.readFileSync(svgPath, 'utf8');
  const dimensions = getSVGDimensions(svgContent);
  
  if (!dimensions.width || !dimensions.height) {
    throw new Error('SVG must have width and height or viewBox');
  }
  
  const width = scale * dimensions.width;
  const height = scale * dimensions.height;
  
  let sharpInstance = sharp(svgPath).resize(width, height);
  
  switch (format) {
    case 'jpg':
    case 'jpeg':
      sharpInstance = sharpInstance.jpeg({ quality });
      break;
    case 'webp':
      sharpInstance = sharpInstance.webp({ quality });
      break;
    case 'png':
    default:
      sharpInstance = sharpInstance.png();
      break;
  }
  
  return sharpInstance.toBuffer();
}

/**
 * Converts an SVG file to PNG format (legacy function name)
 * 
 * @deprecated Use svgToImage instead
 */
export async function svg2Png(
  svgPath: string,
  pngPath?: string,
  scale?: number
): Promise<void | Buffer> {
  if (!svgPath) {
    throw new Error('SVG file path is required');
  }
  
  const buffer = await svgToImage(svgPath, { scale: scale ?? 2, format: 'png' });
  
  if (pngPath) {
    fs.writeFileSync(pngPath, buffer);
    return;
  }
  
  return buffer;
}
