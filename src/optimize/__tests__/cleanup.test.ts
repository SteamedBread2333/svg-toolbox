import { removeEmptyAttributes, removeComments, normalizeWhitespace, optimizeSVG } from '../cleanup';
import { createSVGElement } from '../../core/element';

describe('SVG Cleanup', () => {
  describe('removeEmptyAttributes', () => {
    it('should remove empty attributes', () => {
      const svgContent = '<svg><circle cx="50" cy="50" r="" fill="red" stroke="" /></svg>';
      const result = removeEmptyAttributes(svgContent);
      
      expect(result).toContain('cx="50"');
      expect(result).toContain('fill="red"');
      expect(result).not.toContain('r=""');
      expect(result).not.toContain('stroke=""');
    });

    it('should work with SVG element input', () => {
      const svgContent = '<svg><rect x="10" y="" width="100" height="50" /></svg>';
      const element = createSVGElement(svgContent);
      const result = removeEmptyAttributes(element);
      
      expect(result).toContain('x="10"');
      expect(result).not.toContain('y=""');
    });
  });

  describe('removeComments', () => {
    it('should remove HTML comments', () => {
      const svgContent = '<svg><!-- This is a comment --><circle cx="50" cy="50" r="40" /></svg>';
      const result = removeComments(svgContent);
      
      expect(result).not.toContain('<!--');
      expect(result).not.toContain('-->');
      expect(result).toContain('circle');
    });

    it('should handle multiple comments', () => {
      const svgContent = '<svg><!-- Comment 1 --><circle /><!-- Comment 2 --></svg>';
      const result = removeComments(svgContent);
      
      expect(result).not.toContain('Comment');
    });

    it('should handle nested comments correctly', () => {
      // This tests the incomplete sanitization fix
      // Input: "<!--<!-- comment -->-->" should become "" not "<!-- comment -->"
      const svgContent = '<svg><!--<!-- nested comment -->--><circle /></svg>';
      const result = removeComments(svgContent);
      
      expect(result).not.toContain('<!--');
      expect(result).not.toContain('-->');
      expect(result).not.toContain('nested comment');
      expect(result).toContain('circle');
    });

    it('should handle deeply nested comments', () => {
      const svgContent = '<svg><!--<!--<!-- triple nested -->-->--><circle /></svg>';
      const result = removeComments(svgContent);
      
      expect(result).not.toContain('<!--');
      expect(result).not.toContain('-->');
      expect(result).toContain('circle');
    });

    it('should throw error for content exceeding maximum length', () => {
      const largeContent = '<!--' + 'x'.repeat(10000001) + '-->';
      expect(() => removeComments(largeContent)).toThrow('exceeds maximum allowed length');
    });

    it('should handle comments with newlines', () => {
      const svgContent = '<svg><!--\nMulti-line\ncomment\n--><circle /></svg>';
      const result = removeComments(svgContent);
      
      expect(result).not.toContain('<!--');
      expect(result).not.toContain('-->');
      expect(result).not.toContain('Multi-line');
      expect(result).toContain('circle');
    });
  });

  describe('normalizeWhitespace', () => {
    it('should normalize whitespace', () => {
      const svgContent = '<svg>   <circle   cx="50"   cy="50"   />   </svg>';
      const result = normalizeWhitespace(svgContent);
      
      expect(result).toContain('<circle');
      expect(result).not.toMatch(/\s{2,}/);
    });

    it('should remove whitespace between tags', () => {
      const svgContent = '<svg>\n  <circle />\n  <rect />\n</svg>';
      const result = normalizeWhitespace(svgContent);
      
      expect(result).toMatch(/><circle/);
      expect(result).toMatch(/><rect/);
    });
  });

  describe('optimizeSVG', () => {
    it('should apply all optimizations', () => {
      const svgContent = '<svg><!-- Comment --><circle cx="50" cy="" r="40" fill="red" />   </svg>';
      const result = optimizeSVG(svgContent);
      
      expect(result).not.toContain('<!--');
      expect(result).not.toContain('cy=""');
      expect(result).toContain('circle');
      expect(result).toContain('fill="red"');
    });

    it('should work with SVG element input', () => {
      const svgContent = '<svg><rect x="10" y="20" width="100" /></svg>';
      const element = createSVGElement(svgContent);
      const result = optimizeSVG(element);
      
      expect(result).toContain('rect');
    });
  });
});
