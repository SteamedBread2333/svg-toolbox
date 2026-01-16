import { createSVGElement, cloneSVGElement, mergeSVGElements, serializeSVG } from '../element';
import { JSDOM } from 'jsdom';

describe('Element Manipulation', () => {
  const dom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`);
  const { document } = dom.window;

  describe('createSVGElement', () => {
    it('should create an SVG element from a string', () => {
      const svgString = '<svg><circle cx="50" cy="50" r="40" /></svg>';
      const element = createSVGElement(svgString);
      
      expect(element.tagName.toLowerCase()).toBe('svg');
      expect(element.querySelector('circle')).toBeTruthy();
    });

    it('should handle complex SVG content', () => {
      const svgString = '<svg viewBox="0 0 100 100"><path d="M10 10 L90 90" /></svg>';
      const element = createSVGElement(svgString);
      
      expect(element.getAttribute('viewBox')).toBe('0 0 100 100');
      expect(element.querySelector('path')).toBeTruthy();
    });
  });

  describe('cloneSVGElement', () => {
    it('should create a deep clone of an SVG element', () => {
      const svgString = '<svg><circle cx="50" cy="50" r="40" /></svg>';
      const original = createSVGElement(svgString);
      const cloned = cloneSVGElement(original);
      
      expect(cloned.tagName.toLowerCase()).toBe('svg');
      expect(cloned.querySelector('circle')).toBeTruthy();
      expect(cloned).not.toBe(original);
    });

    it('should preserve all attributes when cloning', () => {
      const svgString = '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="10" width="80" height="80" /></svg>';
      const original = createSVGElement(svgString);
      const cloned = cloneSVGElement(original);
      
      expect(cloned.getAttribute('viewBox')).toBe('0 0 100 100');
      expect(cloned.querySelector('rect')).toBeTruthy();
    });
  });

  describe('mergeSVGElements', () => {
    it('should merge multiple SVG elements into one', () => {
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', '50');
      circle.setAttribute('cy', '50');
      circle.setAttribute('r', '40');
      
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      rect.setAttribute('x', '10');
      rect.setAttribute('y', '10');
      rect.setAttribute('width', '80');
      rect.setAttribute('height', '80');
      
      const merged = mergeSVGElements([circle, rect]);
      
      expect(merged.tagName.toLowerCase()).toBe('svg');
      expect(merged.querySelector('circle')).toBeTruthy();
      expect(merged.querySelector('rect')).toBeTruthy();
    });

    it('should handle empty array', () => {
      const merged = mergeSVGElements([]);
      expect(merged.tagName.toLowerCase()).toBe('svg');
      expect(merged.children.length).toBe(0);
    });
  });

  describe('serializeSVG', () => {
    it('should serialize an SVG element to string', () => {
      const svgString = '<svg><circle cx="50" cy="50" r="40" /></svg>';
      const element = createSVGElement(svgString);
      const serialized = serializeSVG(element);
      
      expect(typeof serialized).toBe('string');
      expect(serialized).toContain('svg');
      expect(serialized).toContain('circle');
    });

    it('should return string as-is if input is already a string', () => {
      const svgString = '<svg><rect /></svg>';
      const serialized = serializeSVG(svgString);
      
      expect(serialized).toBe(svgString);
    });

    it('should throw error for invalid input', () => {
      expect(() => serializeSVG(null as any)).toThrow();
      expect(() => serializeSVG(123 as any)).toThrow();
    });
  });
});
