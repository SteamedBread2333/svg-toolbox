/**
 * SVG path analysis utilities
 */

import { JSDOM } from 'jsdom';
import { serializeSVG } from '../core/element';
import { isValidSvgString, isValidSvgElement } from '../utils/validation';
import { PathCommand } from '../types';

/**
 * Parses the 'd' attribute of a path element into command objects
 */
export function parsePathData(pathData: string): PathCommand[] {
  const commands: PathCommand[] = [];
  
  // Split by path commands (M, L, H, V, C, S, Q, T, A, Z)
  const commandRegex = /([MmLlHhVvCcSsQqTtAaZz])((?:\s*-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\s*,?\s*)*)/g;
  let match;
  
  while ((match = commandRegex.exec(pathData)) !== null) {
    const type = match[1];
    const paramsStr = match[2].trim();
    
    if (type.toLowerCase() === 'z') {
      commands.push({ type, params: [] });
    } else if (paramsStr) {
      const params = paramsStr
        .split(/[\s,]+/)
        .filter(p => p.trim() !== '')
        .map(Number)
        .filter(n => !isNaN(n));
      
      commands.push({ type, params });
    }
  }
  
  return commands;
}

/**
 * Analyzes all paths in an SVG and returns their command structures
 */
export function analyzePaths(svgContent: Element | string): Map<string, PathCommand[]> {
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
  
  const paths = svgElement.querySelectorAll('path');
  const pathAnalysis = new Map<string, PathCommand[]>();
  
  Array.from(paths).forEach((path, index) => {
    const d = path.getAttribute('d');
    if (d) {
      const id = path.getAttribute('id') || `path-${index}`;
      pathAnalysis.set(id, parsePathData(d));
    }
  });
  
  return pathAnalysis;
}

/**
 * Gets statistics about paths in an SVG
 */
export function getPathStatistics(svgContent: Element | string): {
  totalPaths: number;
  totalCommands: number;
  commandTypes: Record<string, number>;
} {
  const pathAnalysis = analyzePaths(svgContent);
  
  let totalCommands = 0;
  const commandTypes: Record<string, number> = {};
  
  pathAnalysis.forEach(commands => {
    totalCommands += commands.length;
    commands.forEach(cmd => {
      const type = cmd.type.toUpperCase();
      commandTypes[type] = (commandTypes[type] || 0) + 1;
    });
  });
  
  return {
    totalPaths: pathAnalysis.size,
    totalCommands,
    commandTypes
  };
}
