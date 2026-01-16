/**
 * DOM utility functions for SVG manipulation
 */

import { JSDOM } from 'jsdom';

// Create a singleton virtual DOM environment
const dom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`);
export const { document } = dom.window;
export const { DOMParser, XMLSerializer } = dom.window;

/**
 * Creates a new DOM parser instance
 */
export function createDOMParser(): DOMParser {
  return new dom.window.DOMParser();
}

/**
 * Creates a new XML serializer instance
 */
export function createXMLSerializer(): XMLSerializer {
  return new dom.window.XMLSerializer();
}

/**
 * Gets the SVG namespace URI
 */
export const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
