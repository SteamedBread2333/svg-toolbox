/**
 * @file validate.ts
 * @description This module provides functions to validate SVG content.
 * @module validate
 * @author pipi
 */
import { JSDOM } from 'jsdom';

/**
 * Validates whether the provided content is a valid SVG string.
 * 
 * @param content - The content to be validated (could be a string or another type).
 * @returns True if the content is a valid SVG string, false otherwise.
 */
export function isValidSvgString(content: any): boolean {
  // Check if the content is of type string. If not, it cannot be a valid SVG string.
  if (typeof content !== 'string') {
    return false;
  }

  try {
    // Create a virtual DOM environment
    const dom = new JSDOM(content);
    // Parse the content as SVG and check if the root node is an SVG element.
    const rootNode = new dom.window.DOMParser().parseFromString(content, 'image/svg+xml').documentElement;
    // Return true if the root node is an SVG element, false otherwise.
    return rootNode.nodeName.toLowerCase() === 'svg';
  } catch (error) {
    // If there's an error during parsing, it's not a valid SVG string.
    return false;
  }
}

/**
 * Validates whether the provided content is a valid SVG element.
 * 
 * @param content - The content to be validated (could be an Element or another type).
 * @returns True if the content is a valid SVG element, false otherwise.
 */
export function isValidSvgElement(content: any): boolean {
  // Check if the content is an instance of Element and its tag name is 'svg'
  return (
    content &&
    typeof content === 'object' &&
    content.tagName.toLowerCase() === 'svg'
  );
}