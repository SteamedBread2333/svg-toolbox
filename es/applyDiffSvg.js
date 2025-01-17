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
// @ts-ignore
import fs from 'fs';
import sharp from 'sharp';
// @ts-ignore
import pngjs from 'pngjs';
// @ts-ignore
import path from 'path';
//  @ts-ignore
import pixelmatch from 'pixelmatch';
const PNG = pngjs.PNG;
/**
 * Checks if the filename has a valid suffix.
 * @param {string} filename - The name of the file.
 * @returns {boolean} - True if the filename has a suffix, false otherwise.
 */
function validSuffix(filename) {
    return path.extname(filename) !== '';
}
/**
 * Compares two SVG files and generates a diff image.
 * @param {string} pathA - The path of the first SVG file.
 * @param {string} pathB - The path of the second SVG file.
 * @param {string} diffFilePath - The path to save the diff image.
 * @returns - The diff image buffer and the number of different pixels.
 */
export default async function (pathA, pathB, diffFilePath) {
    // Import pixelmatch library
    // @ts-ignore
    // const pixelmatch = (await import('pixelmatch')).default;
    // Read the PNG files as buffers
    const pngA = await sharp(pathA).toBuffer();
    const pngB = await sharp(pathB).toBuffer();
    // Decode the PNG buffers
    const img1 = PNG.sync.read(pngA);
    const img2 = PNG.sync.read(pngB);
    const { width, height } = img1;
    // Create a new PNG object for the diff image
    const diff = new PNG({ width, height });
    // Compare the images and get the number of different pixels
    const numDiffPixels = pixelmatch(img1.data, img2.data, diff.data, width, height, { threshold: 0.1 });
    // Write the diff image to a buffer
    const diffPngBuffer = PNG.sync.write(diff);
    // If a diff file path is provided, save the diff image
    if (diffFilePath) {
        const diffFileName = path.basename(diffFilePath);
        if (!validSuffix(diffFileName)) {
            console.error(`Error converting ${diffFileName} to PNG: No suffix found.`);
            return;
        }
        fs.writeFileSync(diffFilePath, diffPngBuffer);
        // Log the result
        if (numDiffPixels === 0) {
            console.log(`\x1b[32mFile name: ${diffFileName} Number of different pixels: ${numDiffPixels}\x1b[0m`);
        }
        else {
            console.log(`\x1b[33mFile name: ${diffFileName} Number of different pixels: ${numDiffPixels}\x1b[0m`);
        }
    }
    return { diffPngBuffer, numDiffPixels };
}
//# sourceMappingURL=applyDiffSvg.js.map