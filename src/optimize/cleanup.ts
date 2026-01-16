/**
 * SVG cleanup and optimization utilities
 */

import { JSDOM } from 'jsdom';
import { serializeSVG } from '../core/element';
import { isValidSvgString, isValidSvgElement } from '../utils/validation';

/**
 * Removes empty attributes from SVG elements
 */
export function removeEmptyAttributes(svgContent: Element | string): string {
  const svgString = isValidSvgString(svgContent) 
    ? svgContent 
    : serializeSVG(svgContent);
  
  const dom = new JSDOM(svgString, {
    contentType: 'image/svg+xml'
  });
  
  const document = dom.window.document;
  const svgElement = document.querySelector('svg');
  
  if (!svgElement) {
    throw new Error('No SVG element found in the provided content.');
  }
  
  function removeEmptyAttrs(element: Element): void {
    const attrs = Array.from(element.attributes);
    attrs.forEach(attr => {
      if (!attr.value || attr.value.trim() === '') {
        element.removeAttribute(attr.name);
      }
    });
    
    Array.from(element.children).forEach(child => {
      removeEmptyAttrs(child);
    });
  }
  
  removeEmptyAttrs(svgElement);
  
  return svgElement.outerHTML.trim();
}

/**
 * Maximum allowed SVG content length to prevent ReDoS attacks
 */
const MAX_SVG_CONTENT_LENGTH = 10000000; // 10MB should be sufficient for most SVG files

/**
 * Removes comments from SVG content
 * 
 * This function uses iterative replacement to handle nested comments correctly
 * and includes input length validation to prevent ReDoS attacks.
 * 
 * The function handles cases like:
 * - Simple comments: <!-- comment -->
 * - Nested comments: <!--<!-- inner -->-->
 * - Multiple comments: <!-- one --><!-- two -->
 */
export function removeComments(svgContent: string): string {
  // Validate input length to prevent ReDoS attacks
  if (svgContent.length > MAX_SVG_CONTENT_LENGTH) {
    throw new Error(`SVG content length exceeds maximum allowed length of ${MAX_SVG_CONTENT_LENGTH} characters`);
  }

  // Use iterative replacement to handle nested comments
  // This prevents incomplete sanitization where nested comments could reappear
  // Example: "<!--<!-- comment -->-->" should become "" not "<!-- comment -->"
  let previous: string;
  let result = svgContent;
  let iterations = 0;
  const MAX_ITERATIONS = 1000; // Prevent infinite loops
  
  do {
    previous = result;
    // Match HTML comments and standalone delimiters:
    // - Full comments: <!-- ... --> or <!-- ... --!>
    // - Orphaned starts: <!--
    // - Orphaned ends: --> or --!>
    // The regex uses non-greedy matching (*?) to match the shortest possible comment
    // and is applied iteratively until no further matches remain.
    result = result.replace(/<!--[\s\S]*?--!?>|<!--|--!?>(?=[^>]|$)/g, '');
    iterations++;
    
    if (iterations > MAX_ITERATIONS) {
      throw new Error('Comment removal exceeded maximum iterations. SVG content may be malformed.');
    }
  } while (result !== previous);
  
  return result;
}

/**
 * Normalizes whitespace in SVG content
 */
export function normalizeWhitespace(svgContent: string): string {
  return svgContent
    .replace(/\s+/g, ' ')
    .replace(/>\s+</g, '><')
    .trim();
}

/**
 * Optimizes SVG by removing empty attributes, comments, and normalizing whitespace
 */
export function optimizeSVG(svgContent: Element | string): string {
  let svgString = isValidSvgString(svgContent) 
    ? svgContent 
    : serializeSVG(svgContent);
  
  svgString = removeComments(svgString);
  svgString = removeEmptyAttributes(svgString);
  svgString = normalizeWhitespace(svgString);
  
  return svgString;
}
