/**
 * @file applyRemoveNanCoordinates.js
 * @description This module provides a function to parse and normalize the 'd' attribute of all path elements in an SVG content.
 * @requires jsdom - JavaScript DOM library
 * @module applyRemoveNanCoordinates
 * @author pipi
 */
import { JSDOM } from 'jsdom';

/**
 * Parses and normalizes the 'd' attribute of all path elements in an SVG content.
 * @param {*} svgContent 
 * @returns 
 */
export default function (svgContent: string): string {
  // Create a DOM from the SVG content
  const dom = new JSDOM(svgContent, {
    contentType: 'image/svg+xml' // Set content type to SVG
  });
  // Get the document and SVG element
  const document = dom.window.document;
  // Get the SVG element
  const svgElement = document.querySelector('svg');

  // Check if an SVG element was found
  if (!svgElement) {
    throw new Error('No SVG element found in the provided content.');
  }

  const paths = svgElement.querySelectorAll('path');
  // Iterate over each path element
  Array.from(paths).forEach((path) => {
    const d = path.getAttribute('d'); // Get the 'd' attribute
    if (d === null) {
      return;
    }
    // Split the 'd' attribute into commands and parameters
    const commands = d
      // Remove 'nan' and '-nan' values
      .replace(/nan|-nan/g, ' ')
      // Split the 'd' attribute into commands and parameters. path command: M, L, H, V, C, S, Q, T, A, Z, z. 
      // -> https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d#path_commands
      .split(/(?=[MmLlHhVvCcSsQqTtAaZz])/).map((command) => {
        // Split each command into type and parameters
        const type = command[0];
        // If the command is not 'z' or 'Z', then it has parameters.
        if (type !== 'Z' && type !== 'z') {
          // Split parameters by spaces or commas, filter out empty values, and convert to numbers
          const params = command.slice(1).split(/[\s,]+/)
          // Filter out non-numeric values
          if (params.every(Number)) {
            return { type, params };
          }
        } else {
          return { type, params: [] };
        }
      })
      // Filter out undefined values
      .filter((item) => item !== void 0)
      // Filter out commands with no parameters, or commands with only 'z' or 'Z'. 'Zz' means close the path. 
      // -> https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/d#closepath
      .filter((command) => (command.type === 'Z' || command.type === 'z' || command.params.length > 0));
    // Reconstruct the 'd' attribute
    const modifiedD = commands.map((command) => {
      return command.type + command.params.join(' ');
    }).join('');
    path.setAttribute('d', modifiedD); // Set the modified 'd' attribute
  });

  // Get the new SVG content
  const newSvgContent = svgElement.outerHTML.trim();
  return newSvgContent;
}