/**
 * @file validate.ts
 * @description This module provides functions to validate SVG content.
 * @module validate
 * @author pipi
 */

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

  // Regular expression to find the <svg> opening tag in the string.
  const svgRegExp = /<svg([^>]*?)?>/i;
  const startTag = content.match(svgRegExp);

  // Check if a matching <svg> tag was found and it's in lowercase (case-insensitive check).
  return !!(startTag && startTag[0].toLowerCase().includes('<svg'));
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
    content.tagName.toLowerCase() === 'svg' &&
    content.namespaceURI === 'http://www.w3.org/2000/svg' // SVG namespace URI
  );
}