/**
 * @file utils.ts
 * @description This module provides utility functions for working with SVG elements.
 * @module utils
 * @requires jsdom - A JavaScript implementation of the WHATWG DOM and HTML standards.
 * @author pipi
 */

import { JSDOM } from 'jsdom';
import { isValidSvgElement, isValidSvgString } from './validate';

// Create a virtual DOM environment
const dom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`);
const { document } = dom.window;

/**
 * Creates an SVG element from a given element.
 *
 * This function serializes the given element to a string, then parses it back to create an SVG element.
 * This approach ensures that the element is correctly parsed as an SVG element.
 *
 * @param {Element} element - The element to create an SVG element from.
 * @returns {Element} - The created SVG element.
 * @see URL_ADDRESS * @see https://www.w3.org/TR/DOM-Level-2-Core/core.html#ID-6ED8C4D5 - DOM Level 2 Core spe
 * @see URL_ADDRESS.w3.org/TR/DOM-Level-2-Core/core.html#ID-6ED8C4D5 - DOM Level 2 Core specification
 * @see URL_ADDRESS * @see https://developer.mozilla.org/en-US/docs/Web/API/XMLSerializer - XMLSerializer documentation
 */
export function createSVGElement(svgContent: string): Element {
  const svgElement = new dom.window.DOMParser().parseFromString(svgContent, 'image/svg+xml').documentElement;
  return svgElement
}

/**
 * Clones an SVG element deeply.
 * 
 * This function serializes the given SVG element to a string, then parses it back to create a deep clone.
 * This approach ensures that all attributes and child nodes are duplicated.
 * 
 * @param {Element} element - The SVG element to clone.
 * @returns {Element} - The cloned SVG element.
 * @see https://www.w3.org/TR/DOM-Level-2-Core/core.html#ID-6ED8C4D5 - DOM Level 2 Core specification
 * @see https://developer.mozilla.org/en-US/docs/Web/API/XMLSerializer - XMLSerializer documentation
 */
export function cloneSVGElement(element: Element): Element {
  const serializer = new dom.window.XMLSerializer();
  const sourceCode = serializer.serializeToString(element);
  const parser = new dom.window.DOMParser();
  const doc = parser.parseFromString(sourceCode, 'image/svg+xml');
  return doc.documentElement!;
}

/**
 * Merges multiple SVG elements into a single SVG element.
 * 
 * This function creates a new SVG element and appends clones of the provided elements to it.
 * The SVG namespace is specified as 'http://www.w3.org/2000/svg'.
 * 
 * @param {Element[]} elements - An array of SVG elements to merge.
 * @returns {Element} - The merged SVG element.
 * @see https://www.w3.org/TR/SVG/ - SVG specification
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/createElementNS - createElementNS documentation
 */
export function mergeSVGElements(elements: Element[]): Element {
  const mergedSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  elements.forEach((element) => {
    mergedSVG.appendChild(cloneSVGElement(element));
  });
  return mergedSVG;
}

/**
 * Converts an SVG element or SVG string to a Base64-encoded string.
 * 
 * This function serializes the SVG element or SVG string to a string and then encodes it to Base64.
 * The resulting string can be used as a data URI for embedding SVG content in HTML or CSS.
 * 
 * @param {Element | string} svgContent - The SVG element or SVG string to convert.
 * @returns {string} - The Base64-encoded string representation of the SVG element.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/XMLSerializer - XMLSerializer documentation
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Buffer - Buffer documentation
 */
export function convertSVGToBase64(svgContent: Element | string): string {
  let svgString: string;
  if (isValidSvgString(svgContent)) {
    svgString = svgContent as string;
  } else if (isValidSvgElement(svgContent)) {
    const serializer = new dom.window.XMLSerializer();
    svgString = serializer.serializeToString(svgContent as Element);
  } else {
    throw new Error('The provided content is not a valid SVG string or SVG element.');
  }
  return `data:image/svg+xml;base64,${Buffer.from(svgString).toString('base64')}`;
}

/**
 * Converts a Base64-encoded string to an SVG string.
 *
 * This function decodes the Base64-encoded string and then converts it to an SVG string.
 * The resulting string can be used to create an SVG element using the `createSVGElement` function.
 *
 * @param {string} base64String - The Base64-encoded string to convert.
 * @returns {string} - The SVG string representation of the Base64-encoded string.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMParser - DOMParser documentation
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Buffer - Buffer documentation
 */
export function convertBase64ToSVG(base64String: string): string {
  try {
    const svgString = Buffer.from(base64String.split(',')[1], 'base64').toString('utf-8');
    return svgString;
  } catch (error) {
    throw new Error('Invalid Base64 string.');
  }
}