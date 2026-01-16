import { extractColors } from '../colors';
import { createSVGElement } from '../../core/element';

describe('Color Analysis', () => {
  describe('extractColors', () => {
    it('should extract fill colors', () => {
      const svgContent = '<svg><circle fill="red" /><rect fill="blue" /></svg>';
      const colors = extractColors(svgContent);
      
      expect(colors.length).toBeGreaterThan(0);
      expect(colors.some(c => c.fill === 'red')).toBe(true);
      expect(colors.some(c => c.fill === 'blue')).toBe(true);
    });

    it('should extract stroke colors', () => {
      const svgContent = '<svg><path stroke="green" stroke-width="2" /></svg>';
      const colors = extractColors(svgContent);
      
      expect(colors.some(c => c.stroke === 'green')).toBe(true);
    });

    it('should extract opacity values', () => {
      const svgContent = '<svg><circle fill="red" opacity="0.5" /></svg>';
      const colors = extractColors(svgContent);
      
      const redColor = colors.find(c => c.fill === 'red');
      expect(redColor?.opacity).toBe(0.5);
    });

    it('should ignore transparent and none values', () => {
      const svgContent = '<svg><circle fill="none" stroke="transparent" /><rect fill="red" /></svg>';
      const colors = extractColors(svgContent);
      
      expect(colors.some(c => c.fill === 'none')).toBe(false);
      expect(colors.some(c => c.stroke === 'transparent')).toBe(false);
      expect(colors.some(c => c.fill === 'red')).toBe(true);
    });

    it('should work with SVG element input', () => {
      const svgContent = '<svg><circle fill="purple" /></svg>';
      const element = createSVGElement(svgContent);
      const colors = extractColors(element);
      
      expect(colors.some(c => c.fill === 'purple')).toBe(true);
    });

    it('should handle nested elements', () => {
      const svgContent = '<svg><g><circle fill="red" /><rect fill="blue" /></g></svg>';
      const colors = extractColors(svgContent);
      
      expect(colors.some(c => c.fill === 'red')).toBe(true);
      expect(colors.some(c => c.fill === 'blue')).toBe(true);
    });
  });
});
