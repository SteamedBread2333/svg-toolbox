import { convertSVGToBase64, convertBase64ToSVG } from '../base64';
import { createSVGElement } from '../../core/element';

describe('Base64 Conversion', () => {
  const testSvg = '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" /></svg>';

  describe('convertSVGToBase64', () => {
    it('should convert SVG string to base64 data URI', () => {
      const base64 = convertSVGToBase64(testSvg);
      
      expect(base64).toMatch(/^data:image\/svg\+xml;base64,/);
      expect(base64.length).toBeGreaterThan(50);
    });

    it('should convert SVG element to base64 data URI', () => {
      const element = createSVGElement(testSvg);
      const base64 = convertSVGToBase64(element);
      
      expect(base64).toMatch(/^data:image\/svg\+xml;base64,/);
    });

    it('should produce consistent results for same input', () => {
      const base64_1 = convertSVGToBase64(testSvg);
      const base64_2 = convertSVGToBase64(testSvg);
      
      expect(base64_1).toBe(base64_2);
    });
  });

  describe('convertBase64ToSVG', () => {
    it('should convert base64 data URI back to SVG string', () => {
      const base64 = convertSVGToBase64(testSvg);
      const svgString = convertBase64ToSVG(base64);
      
      expect(svgString).toContain('<svg');
      expect(svgString).toContain('circle');
    });

    it('should handle base64 string without data URI prefix', () => {
      const base64 = convertSVGToBase64(testSvg);
      const base64Only = base64.split(',')[1];
      const svgString = convertBase64ToSVG(base64Only);
      
      expect(svgString).toContain('<svg');
    });

    it('should throw error for invalid base64 string', () => {
      expect(() => convertBase64ToSVG('invalid-base64!!!')).toThrow('Invalid Base64 string');
    });

    it('should round-trip correctly', () => {
      const original = testSvg;
      const base64 = convertSVGToBase64(original);
      const converted = convertBase64ToSVG(base64);
      
      // Remove whitespace differences for comparison
      const normalize = (s: string) => s.replace(/\s+/g, ' ').trim();
      expect(normalize(converted)).toContain('<svg');
      expect(normalize(converted)).toContain('circle');
    });
  });
});
