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
 * Removes comments from SVG content
 */
export function removeComments(svgContent: string): string {
  return svgContent.replace(/<!--[\s\S]*?-->/g, '');
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
