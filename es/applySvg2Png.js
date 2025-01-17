/**
 * @file applySvg2Png.js
 * @description This module provides a function to convert SVG files to PNG format using the sharp library.
 * @module applySvg2Png
 * @requires sharp - Image processing library
 * @requires fs - File system module
 * @author pipi
 */
import sharp from 'sharp';
// @ts-ignore
import fs from 'fs';
/**
 * Converts an SVG file to PNG format.
 * @param {string} svgPath - The path to read the SVG file.
 * @param {string} pngPath - The path to save the PNG file.
 * @param {number} x - The scaling factor for the PNG image.
 * @returns
 */
export default function (svgPath, pngPath, x = 2) {
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
}
//# sourceMappingURL=applySvg2Png.js.map