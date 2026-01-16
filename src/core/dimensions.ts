/**
 * SVG dimensions and viewBox utilities
 */

import { isValidSvgElement, isValidSvgString } from '../utils/validation';
import { serializeSVG } from './element';
import { SVGDimensions } from '../types';

/**
 * Extracts dimensions from an SVG element or string
 */
export function getSVGDimensions(svgContent: Element | string): SVGDimensions {
  const svgString = isValidSvgString(svgContent) 
    ? svgContent 
    : serializeSVG(svgContent);
  
  const viewBoxRegex = /viewBox=["']?(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)["']?/i;
  const widthRegex = /width=["']?(\d+(?:\.\d+)?)/i;
  const heightRegex = /height=["']?(\d+(?:\.\d+)?)/i;
  
  const viewBoxMatch = svgString.match(viewBoxRegex);
  const widthMatch = svgString.match(widthRegex);
  const heightMatch = svgString.match(heightRegex);
  
  let width: number;
  let height: number;
  let viewBox: SVGDimensions['viewBox'];
  
  if (viewBoxMatch) {
    const [, x, y, w, h] = viewBoxMatch.map(Number);
    viewBox = { x, y, width: w, height: h };
    width = w;
    height = h;
  } else {
    width = widthMatch ? Number(widthMatch[1]) : 0;
    height = heightMatch ? Number(heightMatch[1]) : 0;
  }
  
  return { width, height, viewBox };
}
