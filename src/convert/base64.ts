/**
 * Base64 encoding/decoding utilities for SVG
 */

import { isValidSvgString, isValidSvgElement } from '../utils/validation';
import { serializeSVG } from '../core/element';

/**
 * Converts an SVG element or SVG string to a Base64-encoded data URI
 */
export function convertSVGToBase64(svgContent: Element | string): string {
  const svgString = serializeSVG(svgContent);
  return `data:image/svg+xml;base64,${Buffer.from(svgString).toString('base64')}`;
}

/**
 * Converts a Base64-encoded data URI back to an SVG string
 */
export function convertBase64ToSVG(base64String: string): string {
  try {
    const base64Data = base64String.includes(',') 
      ? base64String.split(',')[1] 
      : base64String;
    
    // Validate base64 string format
    if (!/^[A-Za-z0-9+/]*={0,2}$/.test(base64Data)) {
      throw new Error('Invalid Base64 string.');
    }
    
    const svgString = Buffer.from(base64Data, 'base64').toString('utf-8');
    
    // Basic validation that result looks like SVG
    if (!svgString.includes('<svg') && !svgString.includes('<SVG')) {
      throw new Error('Invalid Base64 string.');
    }
    
    return svgString;
  } catch (error) {
    if (error instanceof Error && error.message === 'Invalid Base64 string.') {
      throw error;
    }
    throw new Error('Invalid Base64 string.');
  }
}
