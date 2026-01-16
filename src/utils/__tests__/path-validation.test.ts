import { validateFilePath, validateReadPath, validateWritePath } from '../path-validation';
import path from 'path';
import fs from 'fs';
import os from 'os';

describe('Path Validation', () => {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'svg-toolbox-test-'));

  afterAll(() => {
    fs.rmSync(tempDir, { recursive: true, force: true });
  });

  describe('validateFilePath', () => {
    it('should normalize valid paths', () => {
      const result = validateFilePath('./test.svg');
      expect(path.isAbsolute(result)).toBe(true);
    });

    it('should reject paths with .. traversal', () => {
      expect(() => validateFilePath('../etc/passwd')).toThrow('Path traversal detected');
      expect(() => validateFilePath('../../secret')).toThrow('Path traversal detected');
    });

    it('should reject empty paths', () => {
      expect(() => validateFilePath('')).toThrow('File path must be a non-empty string');
      expect(() => validateFilePath(null as any)).toThrow('File path must be a non-empty string');
    });

    it('should restrict paths to base directory when provided', () => {
      const baseDir = tempDir;
      const validPath = path.join(baseDir, 'test.svg');
      expect(() => validateFilePath(validPath, baseDir)).not.toThrow();
      
      expect(() => validateFilePath('/etc/passwd', baseDir)).toThrow('Path is outside the allowed directory');
    });
  });

  describe('validateReadPath', () => {
    it('should validate file extensions', () => {
      expect(() => validateReadPath('test.svg', ['.svg'])).not.toThrow();
      expect(() => validateReadPath('test.png', ['.svg'])).toThrow('File extension .png is not allowed');
    });

    it('should accept multiple allowed extensions', () => {
      expect(() => validateReadPath('test.svg', ['.svg', '.png'])).not.toThrow();
      expect(() => validateReadPath('test.png', ['.svg', '.png'])).not.toThrow();
    });

    it('should be case-insensitive for extensions', () => {
      expect(() => validateReadPath('test.SVG', ['.svg'])).not.toThrow();
    });
  });

  describe('validateWritePath', () => {
    it('should validate file extensions', () => {
      const writePath = path.join(tempDir, 'test.png');
      expect(() => validateWritePath(writePath, ['.png'])).not.toThrow();
      expect(() => validateWritePath(writePath, ['.svg'])).toThrow('File extension .png is not allowed');
    });

    it('should create directory if it does not exist', () => {
      const newDir = path.join(tempDir, 'new-dir');
      const writePath = path.join(newDir, 'test.png');
      
      expect(fs.existsSync(newDir)).toBe(false);
      validateWritePath(writePath, ['.png']);
      expect(fs.existsSync(newDir)).toBe(true);
    });

    it('should restrict writes to base directory when provided', () => {
      const baseDir = tempDir;
      const validPath = path.join(baseDir, 'test.png');
      expect(() => validateWritePath(validPath, ['.png'], baseDir)).not.toThrow();
      
      expect(() => validateWritePath('/tmp/test.png', ['.png'], baseDir)).toThrow('Path is outside the allowed directory');
    });
  });
});
