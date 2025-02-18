/**
 * @file pixelLevelDiffSvg.ts
 * @description This module provides a function to compare two SVG files and generate a diff image.
 * @module applyDiffSvg
 * @requires pixelmatch - Image comparison library
 * @requires pngjs - PNG image processing library
 * @author pipi
 */
import { PNG } from "pngjs";
import pixelmatch from 'pixelmatch';

export default function (pngA: Buffer<ArrayBufferLike>, pngB: Buffer<ArrayBufferLike>, threshold: number = 0.1): { diffPngBuffer: Buffer<ArrayBufferLike>, numDiffPixels: number } {
  // Decode the PNG buffers
  const img1 = PNG.sync.read(pngA);
  const img2 = PNG.sync.read(pngB);
  const { width, height } = img1;

  // Create a new PNG object for the diff image
  const diff = new PNG({ width, height });

  // Compare the images and get the number of different pixels
  const numDiffPixels = pixelmatch(img1.data, img2.data, diff.data, width, height, { threshold });

  // Write the diff image to a buffer
  const diffPngBuffer = PNG.sync.write(diff);

  return {
    // The diff image buffer
    diffPngBuffer,
    // The number of different pixels
    numDiffPixels
  };
}