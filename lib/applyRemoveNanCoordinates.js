"use strict";
/**
 * @file applyRemoveNanCoordinates.js
 * @description This module provides a function to parse and normalize the 'd' attribute of all path elements in an SVG content.
 * @requires jsdom - JavaScript DOM library
 * @module applyRemoveNanCoordinates
 * @author pipi
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
// @ts-ignore
var jsdom_1 = require("jsdom");
/**
 * Parses and normalizes the 'd' attribute of all path elements in an SVG content.
 * @param {*} svgContent
 * @returns
 */
function default_1(svgContent) {
    // Create a DOM from the SVG content
    var dom = new jsdom_1.JSDOM(svgContent, {
        contentType: 'image/svg+xml' // Set content type to SVG
    });
    var document = dom.window.document;
    var svgElement = document.querySelector('svg');
    var paths = svgElement.querySelectorAll('path');
    // Iterate over each path element
    Array.from(paths).forEach(function (path) {
        var d = path.getAttribute('d'); // Get the 'd' attribute
        var commands = d.split(/(?=[MLHVCSQTAZ])/).map(function (command) {
            var type = command[0]; // Command type (e.g., M, L, H, etc.)
            var params = command.slice(1).trim().split(/[\s,]+/).filter(Number); // Command parameters
            return { type: type, params: params };
        }).filter(function (command) { return (command.type === 'Z' || command.params.length > 0); }); // Filter out invalid commands
        // Reconstruct the 'd' attribute
        var modifiedD = commands.map(function (command) {
            return command.type + command.params.join(' ');
        }).join('');
        path.setAttribute('d', modifiedD); // Set the modified 'd' attribute
    });
    // Get the new SVG content
    var newSvgContent = svgElement.outerHTML.trim();
    return newSvgContent;
}
//# sourceMappingURL=applyRemoveNanCoordinates.js.map