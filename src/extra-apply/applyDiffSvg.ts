/**
 * @file applyDiffSvg.js
 * @description This module provides a function to compare two PNG images and generate a diff image using the sharp and pixelmatch libraries.
 * @module applyDiffSvg
 * @requires sharp - Image processing library
 * @requires pixelmatch - Image comparison library
 * @requires fs - File system module
 * @requires path - Path module
 * @author pipi
 */
import fs from 'fs';
import sharp from 'sharp';
import path from 'path';
import pixelLevelDiffSvg from '../utils/pixelLevelDiffPng';

/**
 * Checks if the filename has a valid suffix.
 * @param {string} filename - The name of the file.
 * @returns {boolean} - True if the filename has a suffix, false otherwise.
 */
function validSuffix(filename: string) {
  return path.extname(filename) !== '';
}

/**
 * Compares two SVG files and generates a diff image.
 * @param {string} pathA - The path to the first SVG file.
 * @param {string} pathB - The path to the second SVG file.
 * @param {string} diffFilePath - The path to save the diff image.
 * @returns - The diff image buffer and the number of different pixels.
 */
export default async function (pathA: string, pathB: string, diffFilePath: string): Promise<{ diffPngBuffer: Buffer<ArrayBufferLike>, numDiffPixels: number } | void> {
  let diffFileName = '';
  // If a diff file path is provided, save the diff image
  if (diffFilePath) {
    diffFileName = path.basename(diffFilePath);
    if (!validSuffix(diffFileName)) {
      console.error(`Error converting ${diffFileName} to PNG: No suffix found.`);
      return;
    }
  } else {
    console.error('Error converting to PNG: No diff file path provided.');
    return;
  }
  // Read the PNG files as buffers
  const pngA = await sharp(pathA).toBuffer();
  const pngB = await sharp(pathB).toBuffer();

  const { diffPngBuffer, numDiffPixels } = pixelLevelDiffSvg(pngA, pngB, 0.1);
  fs.writeFileSync(diffFilePath, diffPngBuffer);
  // Log the result
  if (numDiffPixels === 0) {
    console.log(`\x1b[32mFile name: ${diffFileName} Number of different pixels: ${numDiffPixels}\x1b[0m`);
  } else {
    console.log(`\x1b[33mFile name: ${diffFileName} Number of different pixels: ${numDiffPixels}\x1b[0m`);
  }

  return {
    // The diff image buffer
    diffPngBuffer,
    // The number of different pixels
    numDiffPixels
  };
}