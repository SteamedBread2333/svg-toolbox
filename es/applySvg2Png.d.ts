/**
 * @file applySvg2Png.js
 * @description This module provides a function to convert SVG files to PNG format using the sharp library.
 * @module applySvg2Png
 * @requires sharp - Image processing library
 * @requires fs - File system module
 * @author pipi
 */
/**
 * Converts an SVG file to PNG format.
 * @param {string} svgPath - The path to read the SVG file.
 * @param {string} pngPath - The path to save the PNG file.
 * @param {number} x - The scaling factor for the PNG image.
 * @returns
 */
export default function (svgPath: string, pngPath: string, x?: number): void;
