import { getSVGDimensions } from '../dimensions';
import { createSVGElement } from '../element';

describe('SVG Dimensions', () => {
  describe('getSVGDimensions', () => {
    it('should extract dimensions from viewBox', () => {
      const svgString = '<svg viewBox="0 0 100 200"></svg>';
      const dimensions = getSVGDimensions(svgString);
      
      expect(dimensions.width).toBe(100);
      expect(dimensions.height).toBe(200);
      expect(dimensions.viewBox).toEqual({ x: 0, y: 0, width: 100, height: 200 });
    });

    it('should extract dimensions from width and height attributes', () => {
      const svgString = '<svg width="150" height="250"></svg>';
      const dimensions = getSVGDimensions(svgString);
      
      expect(dimensions.width).toBe(150);
      expect(dimensions.height).toBe(250);
    });

    it('should prioritize viewBox over width/height', () => {
      const svgString = '<svg viewBox="0 0 100 200" width="150" height="250"></svg>';
      const dimensions = getSVGDimensions(svgString);
      
      expect(dimensions.width).toBe(100);
      expect(dimensions.height).toBe(200);
      expect(dimensions.viewBox).toEqual({ x: 0, y: 0, width: 100, height: 200 });
    });

    it('should work with SVG element input', () => {
      const svgString = '<svg viewBox="0 0 50 75"></svg>';
      const element = createSVGElement(svgString);
      const dimensions = getSVGDimensions(element);
      
      expect(dimensions.width).toBe(50);
      expect(dimensions.height).toBe(75);
    });

    it('should handle decimal values', () => {
      const svgString = '<svg viewBox="0 0 100.5 200.75"></svg>';
      const dimensions = getSVGDimensions(svgString);
      
      expect(dimensions.width).toBe(100.5);
      expect(dimensions.height).toBe(200.75);
    });
  });
});
