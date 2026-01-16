/**
 * Core SVG element manipulation functions
 */

import { createDOMParser, createXMLSerializer, SVG_NAMESPACE, document } from '../utils/dom';
import { isValidSvgString, isValidSvgElement } from '../utils/validation';

/**
 * Creates an SVG element from a given SVG content string
 */
export function createSVGElement(svgContent: string): Element {
  const parser = createDOMParser();
  const svgElement = parser.parseFromString(svgContent, 'image/svg+xml').documentElement;
  return svgElement;
}

/**
 * Clones an SVG element deeply
 * 
 * This function serializes the SVG element to a string, then parses it back
 * to create a deep clone, ensuring all attributes and child nodes are duplicated.
 */
export function cloneSVGElement(element: Element): Element {
  const serializer = createXMLSerializer();
  const sourceCode = serializer.serializeToString(element);
  const parser = createDOMParser();
  const doc = parser.parseFromString(sourceCode, 'image/svg+xml');
  return doc.documentElement;
}

/**
 * Merges multiple SVG elements into a single SVG element
 * 
 * Creates a new SVG element and appends clones of the provided elements to it.
 */
export function mergeSVGElements(elements: Element[]): Element {
  const mergedSVG = document.createElementNS(SVG_NAMESPACE, 'svg');
  elements.forEach((element) => {
    mergedSVG.appendChild(cloneSVGElement(element));
  });
  return mergedSVG;
}

/**
 * Serializes an SVG element or string to a string representation
 */
export function serializeSVG(svgContent: Element | string): string {
  if (isValidSvgString(svgContent)) {
    return svgContent;
  }
  
  if (isValidSvgElement(svgContent)) {
    const serializer = createXMLSerializer();
    return serializer.serializeToString(svgContent);
  }
  
  throw new Error('The provided content is not a valid SVG string or SVG element.');
}
