/**
 * SVG color analysis utilities
 */

import { JSDOM } from 'jsdom';
import { serializeSVG } from '../core/element';
import { isValidSvgString, isValidSvgElement } from '../utils/validation';
import { SVGColor } from '../types';

/**
 * Extracts all colors used in an SVG
 */
export function extractColors(svgContent: Element | string): SVGColor[] {
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
  
  const colors: SVGColor[] = [];
  const colorSet = new Set<string>();
  
  function extractFromElement(element: Element): void {
    const fill = element.getAttribute('fill');
    const stroke = element.getAttribute('stroke');
    const opacity = element.getAttribute('opacity');
    
    if (fill && fill !== 'none' && fill !== 'transparent') {
      const colorKey = `${fill}-${opacity || '1'}`;
      if (!colorSet.has(colorKey)) {
        colorSet.add(colorKey);
        colors.push({
          fill,
          opacity: opacity ? parseFloat(opacity) : undefined
        });
      }
    }
    
    if (stroke && stroke !== 'none' && stroke !== 'transparent') {
      const colorKey = `stroke-${stroke}-${opacity || '1'}`;
      if (!colorSet.has(colorKey)) {
        colorSet.add(colorKey);
        colors.push({
          stroke,
          opacity: opacity ? parseFloat(opacity) : undefined
        });
      }
    }
    
    Array.from(element.children).forEach(child => {
      extractFromElement(child);
    });
  }
  
  extractFromElement(svgElement);
  
  return colors;
}
