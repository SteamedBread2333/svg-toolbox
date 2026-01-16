import { parsePathData, analyzePaths, getPathStatistics } from '../paths';
import { createSVGElement } from '../../core/element';

describe('Path Analysis', () => {
  describe('parsePathData', () => {
    it('should parse simple path commands', () => {
      const pathData = 'M 10,20 L 30,40 Z';
      const commands = parsePathData(pathData);
      
      expect(commands.length).toBe(3);
      expect(commands[0].type).toBe('M');
      expect(commands[0].params).toEqual([10, 20]);
      expect(commands[1].type).toBe('L');
      expect(commands[2].type).toBe('Z');
    });

    it('should handle lowercase commands', () => {
      const pathData = 'm 10,20 l 30,40 z';
      const commands = parsePathData(pathData);
      
      expect(commands.length).toBe(3);
      expect(commands[0].type).toBe('m');
    });

    it('should handle multiple parameters', () => {
      const pathData = 'M 10,20 L 30,40 50,60';
      const commands = parsePathData(pathData);
      
      expect(commands[1].params.length).toBe(4);
    });

    it('should handle cubic bezier commands', () => {
      const pathData = 'M 10,20 C 20,30 40,50 60,70';
      const commands = parsePathData(pathData);
      
      expect(commands.length).toBe(2);
      expect(commands[1].type).toBe('C');
      expect(commands[1].params.length).toBe(6);
    });
  });

  describe('analyzePaths', () => {
    it('should analyze all paths in SVG', () => {
      const svgContent = '<svg><path id="path1" d="M 10,20 L 30,40" /><path id="path2" d="M 50,60 L 70,80" /></svg>';
      const analysis = analyzePaths(svgContent);
      
      expect(analysis.size).toBe(2);
      expect(analysis.has('path1')).toBe(true);
      expect(analysis.has('path2')).toBe(true);
    });

    it('should use index as id if path has no id', () => {
      const svgContent = '<svg><path d="M 10,20" /><path d="M 30,40" /></svg>';
      const analysis = analyzePaths(svgContent);
      
      expect(analysis.has('path-0')).toBe(true);
      expect(analysis.has('path-1')).toBe(true);
    });

    it('should work with SVG element input', () => {
      const svgContent = '<svg><path d="M 10,20 L 30,40" /></svg>';
      const element = createSVGElement(svgContent);
      const analysis = analyzePaths(element);
      
      expect(analysis.size).toBe(1);
    });
  });

  describe('getPathStatistics', () => {
    it('should return correct statistics', () => {
      const svgContent = '<svg><path d="M 10,20 L 30,40 Z" /><path d="M 50,60 L 70,80" /></svg>';
      const stats = getPathStatistics(svgContent);
      
      expect(stats.totalPaths).toBe(2);
      expect(stats.totalCommands).toBeGreaterThan(0);
      expect(stats.commandTypes['M']).toBeGreaterThan(0);
      expect(stats.commandTypes['L']).toBeGreaterThan(0);
    });

    it('should count command types correctly', () => {
      const svgContent = '<svg><path d="M 10,20 M 30,40 L 50,60 L 70,80" /></svg>';
      const stats = getPathStatistics(svgContent);
      
      expect(stats.commandTypes['M']).toBe(2);
      expect(stats.commandTypes['L']).toBe(2);
    });
  });
});
