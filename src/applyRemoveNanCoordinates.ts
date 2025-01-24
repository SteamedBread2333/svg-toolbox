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
      // Split the 'd' attribute into commands and parameters
      .split(/(?=[MmLlHhVvCcSsQqTtAaZz])/).map((command) => {
        // Split each command into type and parameters
        const type = command[0];
        // Split parameters by spaces or commas, filter out empty values, and convert to numbers
        const params = command.slice(1).trim().split(/[\s,]+/).filter(Number);
        return { type, params };
      })
      // Filter out commands with no parameters
      .filter((command) => (command.type === 'Z' || command.params.length > 0));
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