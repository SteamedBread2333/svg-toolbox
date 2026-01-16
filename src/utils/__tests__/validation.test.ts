import { isValidSvgString, isValidSvgElement } from '../validation';
import { createSVGElement } from '../../core/element';

describe('Validation', () => {
  describe('isValidSvgString', () => {
    it('should return true for valid SVG string', () => {
      const svgString = '<svg><circle cx="50" cy="50" r="40" /></svg>';
      expect(isValidSvgString(svgString)).toBe(true);
    });

    it('should return false for non-string input', () => {
      expect(isValidSvgString(null)).toBe(false);
      expect(isValidSvgString(123)).toBe(false);
      expect(isValidSvgString({})).toBe(false);
    });

    it('should return false for invalid SVG string', () => {
      expect(isValidSvgString('<div></div>')).toBe(false);
      expect(isValidSvgString('not svg')).toBe(false);
      expect(isValidSvgString('')).toBe(false);
    });

    it('should handle malformed XML', () => {
      expect(isValidSvgString('<svg><unclosed></svg>')).toBe(false);
    });
  });

  describe('isValidSvgElement', () => {
    it('should return true for valid SVG element', () => {
      const svgString = '<svg><circle /></svg>';
      const element = createSVGElement(svgString);
      expect(isValidSvgElement(element)).toBe(true);
    });

    it('should return false for non-element input', () => {
      expect(isValidSvgElement(null)).toBe(false);
      expect(isValidSvgElement('string')).toBe(false);
      expect(isValidSvgElement({})).toBe(false);
    });

    it('should return false for non-SVG element', () => {
      const { JSDOM } = require('jsdom');
      const dom = new JSDOM(`<!DOCTYPE html><html><body><div></div></body></html>`);
      const div = dom.window.document.querySelector('div');
      
      expect(isValidSvgElement(div)).toBe(false);
    });
  });
});
