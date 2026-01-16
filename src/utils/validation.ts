/**
 * Validation utilities for SVG content
 */

import { JSDOM } from 'jsdom';

/**
 * Validates whether the provided content is a valid SVG string
 */
export function isValidSvgString(content: unknown): content is string {
  if (typeof content !== 'string') {
    return false;
  }

  try {
    const dom = new JSDOM(content);
    const rootNode = new dom.window.DOMParser().parseFromString(content, 'image/svg+xml').documentElement;
    return rootNode.nodeName.toLowerCase() === 'svg';
  } catch {
    return false;
  }
}

/**
 * Validates whether the provided content is a valid SVG element
 */
export function isValidSvgElement(content: unknown): content is Element {
  return (
    content !== null &&
    typeof content === 'object' &&
    'tagName' in content &&
    (content as Element).tagName?.toLowerCase() === 'svg'
  );
}
