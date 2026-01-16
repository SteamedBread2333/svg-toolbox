/**
 * Image comparison and diff utilities
 */

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import { DiffResult } from '../types';

/**
 * Compares two PNG images at the pixel level and generates a diff image
 */
export function pixelLevelDiff(
  pngA: Buffer,
  pngB: Buffer,
  threshold: number = 0.1
): DiffResult {
  const img1 = PNG.sync.read(pngA);
  const img2 = PNG.sync.read(pngB);
  const { width, height } = img1;
  
  if (img2.width !== width || img2.height !== height) {
    throw new Error('Images must have the same dimensions');
  }
  
  const diff = new PNG({ width, height });
  const numDiffPixels = pixelmatch(
    img1.data,
    img2.data,
    diff.data,
    width,
    height,
    { threshold }
  );
  
  const diffPngBuffer = PNG.sync.write(diff);
  
  return {
    diffPngBuffer,
    numDiffPixels
  };
}

/**
 * Compares two image files (SVG or PNG) and generates a diff image
 */
export async function diffImages(
  pathA: string,
  pathB: string,
  diffFilePath?: string,
  threshold: number = 0.1
): Promise<DiffResult> {
  if (!fs.existsSync(pathA)) {
    throw new Error(`File not found: ${pathA}`);
  }
  
  if (!fs.existsSync(pathB)) {
    throw new Error(`File not found: ${pathB}`);
  }
  
  // Convert both images to PNG buffers
  const pngA = await sharp(pathA).png().toBuffer();
  const pngB = await sharp(pathB).png().toBuffer();
  
  const result = pixelLevelDiff(pngA, pngB, threshold);
  
  if (diffFilePath) {
    const ext = path.extname(diffFilePath);
    if (!ext) {
      throw new Error('Diff file path must have a file extension');
    }
    fs.writeFileSync(diffFilePath, result.diffPngBuffer);
  }
  
  return result;
}

/**
 * Legacy function name for diffImages
 * 
 * @deprecated Use diffImages instead
 */
export async function diffSvg(
  pathA: string,
  pathB: string,
  diffFilePath: string
): Promise<DiffResult | void> {
  try {
    return await diffImages(pathA, pathB, diffFilePath);
  } catch (error) {
    console.error(`Error comparing images: ${error instanceof Error ? error.message : String(error)}`);
    return;
  }
}
