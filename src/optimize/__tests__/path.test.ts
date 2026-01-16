import { removeNanCoordinates } from '../path';

describe('Path Optimization', () => {
  describe('removeNanCoordinates', () => {
    it('should remove NaN values from path data', () => {
      const svgContent = '<svg><path d="M 10,20 nan L 30,40 -nan Z" /></svg>';
      const result = removeNanCoordinates(svgContent);
      
      expect(result).not.toContain('nan');
      expect(result).not.toContain('-nan');
      expect(result).toContain('path');
    });

    it('should preserve valid path commands', () => {
      const svgContent = '<svg><path d="M 10,20 L 30,40 Z" /></svg>';
      const result = removeNanCoordinates(svgContent);
      
      expect(result).toContain('M10');
      expect(result).toContain('20');
      expect(result).toContain('L30');
      expect(result).toContain('40');
      expect(result).toContain('Z');
    });

    it('should handle multiple paths', () => {
      const svgContent = '<svg><path d="M 10,20 nan L 30,40" /><path d="M 50,60 L 70,80" /></svg>';
      const result = removeNanCoordinates(svgContent);
      
      expect(result).not.toContain('nan');
      expect(result.split('path').length - 1).toBe(2);
    });

    it('should handle paths without d attribute', () => {
      const svgContent = '<svg><path /><path d="M 10,20 L 30,40" /></svg>';
      const result = removeNanCoordinates(svgContent);
      
      expect(result).toContain('path');
    });

    it('should throw error if no SVG element found', () => {
      expect(() => removeNanCoordinates('<div></div>')).toThrow('No SVG element found');
    });

    it('should handle case-insensitive NaN', () => {
      const svgContent = '<svg><path d="M 10,20 NaN L 30,40 NAN Z" /></svg>';
      const result = removeNanCoordinates(svgContent);
      
      expect(result.toLowerCase()).not.toContain('nan');
    });
  });
});
