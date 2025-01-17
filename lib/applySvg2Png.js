"use strict";
/**
 * @file applySvg2Png.js
 * @description This module provides a function to convert SVG files to PNG format using the sharp library.
 * @module applySvg2Png
 * @requires sharp - Image processing library
 * @requires fs - File system module
 * @author pipi
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
var sharp_1 = __importDefault(require("sharp"));
// @ts-ignore
var fs_1 = __importDefault(require("fs"));
/**
 * Converts an SVG file to PNG format.
 * @param {string} svgPath - The path to read the SVG file.
 * @param {string} pngPath - The path to save the PNG file.
 * @param {number} x - The scaling factor for the PNG image.
 * @returns
 */
function default_1(svgPath, pngPath, x) {
    if (x === void 0) { x = 2; }
    // Read the SVG file
    var file = svgPath.split('/').pop();
    var svgContent = fs_1.default.readFileSync(svgPath, 'utf8');
    // Extract the viewBox from the SVG content
    var viewBoxRegex = /viewBox="(\d+) (\d+) (\d+) (\d+)"/;
    var viewBoxMatch = viewBoxRegex.exec(svgContent);
    if (!viewBoxMatch) {
        console.error("Error converting ".concat(file, " to PNG: No viewBox found."));
        return;
    }
    // Extract the width and height from the viewBox
    var _a = viewBoxMatch.map(Number), baseWidth = _a[3], baseHeight = _a[4];
    // Resize the SVG to the desired dimensions and convert it to PNG
    (0, sharp_1.default)(svgPath)
        .resize(x * baseWidth, x * baseHeight)
        .png()
        .toFile(pngPath)
        .then(function () {
        console.log("\u001B[32mConverted ".concat(file, " to PNG successfully.\u001B[0m"));
    })
        .catch(function (error) {
        console.error("Error converting ".concat(file, " to PNG:"), error);
    });
}
//# sourceMappingURL=applySvg2Png.js.map