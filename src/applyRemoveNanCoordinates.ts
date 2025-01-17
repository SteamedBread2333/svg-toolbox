/**
 * @file applyRemoveNanCoordinates.js
 * @description This module provides a function to parse and normalize the 'd' attribute of all path elements in an SVG content.
 * @requires jsdom - JavaScript DOM library
 * @module applyRemoveNanCoordinates
 * @author pipi
 */

// @ts-ignore
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
  const document = dom.window.document;
  const svgElement = document.querySelector('svg');
  const paths = svgElement.querySelectorAll('path');

  // Iterate over each path element
  Array.from(paths).forEach((path: any) => {
    const d = path.getAttribute('d'); // Get the 'd' attribute
    const commands = d.split(/(?=[MLHVCSQTAZ])/).map((command: string) => {
      const type = command[0]; // Command type (e.g., M, L, H, etc.)
      const params = command.slice(1).trim().split(/[\s,]+/).filter(Number); // Command parameters
      return { type, params };
    }).filter((command: { type: string, params: string[] }) => (command.type === 'Z' || command.params.length > 0)); // Filter out invalid commands

    // Reconstruct the 'd' attribute
    const modifiedD = commands.map((command: { type: string, params: string[] }) => {
      return command.type + command.params.join(' ');
    }).join('');
    path.setAttribute('d', modifiedD); // Set the modified 'd' attribute
  });

  // Get the new SVG content
  const newSvgContent = svgElement.outerHTML.trim();

  return newSvgContent;
}