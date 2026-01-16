/**
 * SVG path optimization utilities
 */

import { JSDOM } from 'jsdom';

const PATH_COMMANDS_WITHOUT_PARAMS = ['z', 'Z'];

/**
 * Removes NaN and invalid coordinates from SVG path elements
 */
export function removeNanCoordinates(svgContent: string): string {
  const dom = new JSDOM(svgContent, {
    contentType: 'image/svg+xml'
  });
  
  const document = dom.window.document;
  const svgElement = document.querySelector('svg');
  
  if (!svgElement) {
    throw new Error('No SVG element found in the provided content.');
  }
  
  const paths = svgElement.querySelectorAll('path');
  
  Array.from(paths).forEach((path) => {
    const d = path.getAttribute('d');
    if (d === null) {
      return;
    }
    
    // Remove NaN values and split into commands
    const commands = d
      .replace(/nan|-nan/gi, ' ')
      .split(/(?=[MmLlHhVvCcSsQqTtAaZz])/)
      .map((command) => {
        const type = command[0];
        const isCommandWithoutParams = PATH_COMMANDS_WITHOUT_PARAMS.includes(type);
        
        if (!isCommandWithoutParams) {
          const params = command
            .slice(1)
            .split(/[\s,]+/)
            .filter(param => param.trim() !== '')
            .map(Number);
          
          // Check if all parameters are valid numbers
          const allValid = params.every(param => !isNaN(param) && isFinite(param));
          
          if (allValid && params.length > 0) {
            return { type, params };
          }
        } else {
          return { type, params: [] };
        }
        
        return null;
      })
      .filter((item): item is { type: string; params: number[] } => item !== null)
      .filter((command) => 
        PATH_COMMANDS_WITHOUT_PARAMS.includes(command.type) || command.params.length > 0
      );
    
    // Reconstruct the 'd' attribute
    const modifiedD = commands
      .map((command) => command.type + command.params.join(' '))
      .join('');
    
    path.setAttribute('d', modifiedD);
  });
  
  return svgElement.outerHTML.trim();
}
