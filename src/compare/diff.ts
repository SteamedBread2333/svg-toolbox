/**
 * Image comparison and diff utilities
 */

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import { DiffResult } from '../types';
import { validateReadPath, validateWritePath } from '../utils/path-validation';

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
  // Validate and normalize file paths to prevent path traversal
  const validatedPathA = validateReadPath(pathA, ['.svg', '.png', '.jpg', '.jpeg', '.webp']);
  const validatedPathB = validateReadPath(pathB, ['.svg', '.png', '.jpg', '.jpeg', '.webp']);
  
  if (!fs.existsSync(validatedPathA)) {
    throw new Error(`File not found: ${validatedPathA}`);
  }
  
  if (!fs.existsSync(validatedPathB)) {
    throw new Error(`File not found: ${validatedPathB}`);
  }
  
  // Convert both images to PNG buffers
  const pngA = await sharp(validatedPathA).png().toBuffer();
  const pngB = await sharp(validatedPathB).png().toBuffer();
  
  const result = pixelLevelDiff(pngA, pngB, threshold);
  
  if (diffFilePath) {
    const ext = path.extname(diffFilePath);
    if (!ext) {
      throw new Error('Diff file path must have a file extension');
    }
    // Validate write path to prevent path traversal
    const validatedWritePath = validateWritePath(diffFilePath, ['.png']);
    fs.writeFileSync(validatedWritePath, result.diffPngBuffer);
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
