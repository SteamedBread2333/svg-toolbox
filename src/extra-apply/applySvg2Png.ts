/**
 * @file applySvg2Png.js
 * @description This module provides a function to convert SVG files to PNG format using the sharp library.
 * @module applySvg2Png
 * @requires sharp - Image processing library
 * @requires fs - File system module
 * @author pipi
 */

import fs from 'fs';
import sharp from 'sharp';

/**
 * Converts an SVG file to PNG format.
 * @param {string} svgPath - The path to read the SVG file. 
 * @param {string} pngPath - The path to save the PNG file. if not provided, return the buffer.
 * @param {number} x - The scaling factor for the PNG image.
 * @returns {Promise<void | Buffer<ArrayBufferLike>>} - The PNG image buffer.
 */
export default async function (svgPath: string, pngPath?: string, x?: number): Promise<void | Buffer<ArrayBufferLike>> {
  if (!svgPath) {
    console.error('Error converting to PNG: No svg file path provided.');
    return;
  }
  if (!pngPath) {
    console.log(`\x1b[33mNo png file path provided, return the buffer.\x1b[0m`);
  }
  if (!x) {
    x = 2
    console.log(`\x1b[33mNo scaling factor provided, use the default value 2.\x1b[0m`);
  }
  // Read the SVG file
  const file = svgPath.split('/').pop();
  const svgContent = fs.readFileSync(svgPath, 'utf8');

  // Extract the viewBox from the SVG content
  const viewBoxRegex = /viewBox="(\d+) (\d+) (\d+) (\d+)"/;
  const viewBoxMatch = viewBoxRegex.exec(svgContent);

  if (!viewBoxMatch) {
    console.error(`Error converting ${file} to PNG: No viewBox found.`);
    return;
  }

  // Extract the width and height from the viewBox
  const [, , , baseWidth, baseHeight] = viewBoxMatch.map(Number);

  if (pngPath) {
    // Resize the SVG to the desired dimensions and convert it to PNG
    sharp(svgPath)
      .resize(x * baseWidth, x * baseHeight)
      .png()
      .toFile(pngPath)
      .then(() => {
        console.log(`\x1b[32mConverted ${file} to PNG successfully.\x1b[0m`);
      })
      .catch(error => {
        console.error(`Error converting ${file} to PNG:`, error);
      });
  } else {
    // Resize the SVG to the desired dimensions and convert it to PNG
    const buffer = await sharp(svgPath)
      .resize(x * baseWidth, x * baseHeight)
      .png()
      .toBuffer()
    return buffer;
  }
}