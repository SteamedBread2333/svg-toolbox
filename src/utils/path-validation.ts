/**
 * Path validation utilities to prevent path traversal attacks
 */

import path from 'path';
import fs from 'fs';

/**
 * Maximum allowed path length to prevent buffer overflow attacks
 */
const MAX_PATH_LENGTH = 4096;

/**
 * Validates and normalizes a file path to prevent directory traversal attacks
 * 
 * @param filePath - The file path to validate
 * @param baseDirectory - Optional base directory to restrict paths to
 * @returns Normalized absolute path
 * @throws Error if path is invalid or contains traversal sequences
 */
export function validateFilePath(
  filePath: string,
  baseDirectory?: string
): string {
  if (!filePath || typeof filePath !== 'string') {
    throw new Error('File path must be a non-empty string');
  }

  // Check path length to prevent buffer overflow attacks
  if (filePath.length > MAX_PATH_LENGTH) {
    throw new Error(`Path length exceeds maximum allowed length of ${MAX_PATH_LENGTH} characters`);
  }

  // Check for null bytes which can be used in path traversal attacks
  if (filePath.includes('\0')) {
    throw new Error('Path contains null bytes which are not allowed');
  }

  // Check for path traversal sequences BEFORE normalization
  // This catches attempts like ../, ..\, etc.
  if (filePath.includes('..')) {
    throw new Error('Path traversal detected: paths containing ".." are not allowed');
  }

  // Resolve to absolute path first, then normalize
  // This ensures that . sequences are resolved
  const absolutePath = path.isAbsolute(filePath)
    ? path.resolve(filePath)
    : path.resolve(process.cwd(), filePath);

  // Normalize the resolved path
  const normalizedPath = path.normalize(absolutePath);

  // Additional safety check: ensure the normalized path doesn't contain .. after resolution
  if (normalizedPath.includes('..')) {
    throw new Error('Path traversal detected: paths containing ".." are not allowed');
  }

  // If base directory is provided, ensure the path is within it
  if (baseDirectory) {
    const baseDir = path.isAbsolute(baseDirectory)
      ? path.resolve(path.normalize(baseDirectory))
      : path.resolve(process.cwd(), baseDirectory);
    
    const resolvedPath = path.resolve(normalizedPath);
    
    // Use path.relative to check if path is within base directory
    const relativePath = path.relative(baseDir, resolvedPath);
    
    // If relative path starts with .. or is absolute, it's outside the base directory
    if (relativePath.startsWith('..') || path.isAbsolute(relativePath)) {
      throw new Error('Path is outside the allowed directory');
    }
  }

  return normalizedPath;
}

/**
 * Validates that a file path is safe for reading
 * 
 * @param filePath - The file path to validate
 * @param allowedExtensions - Optional array of allowed file extensions (e.g., ['.svg', '.png'])
 * @returns Normalized absolute path
 */
export function validateReadPath(
  filePath: string,
  allowedExtensions?: string[]
): string {
  const validatedPath = validateFilePath(filePath);
  
  if (allowedExtensions && allowedExtensions.length > 0) {
    const ext = path.extname(validatedPath).toLowerCase();
    if (!allowedExtensions.includes(ext)) {
      throw new Error(`File extension ${ext} is not allowed. Allowed extensions: ${allowedExtensions.join(', ')}`);
    }
  }
  
  return validatedPath;
}

/**
 * Validates that a file path is safe for writing
 * 
 * @param filePath - The file path to validate
 * @param allowedExtensions - Optional array of allowed file extensions
 * @param baseDirectory - Optional base directory to restrict writes to
 * @returns Normalized absolute path
 */
export function validateWritePath(
  filePath: string,
  allowedExtensions?: string[],
  baseDirectory?: string
): string {
  const validatedPath = validateFilePath(filePath, baseDirectory);
  
  if (allowedExtensions && allowedExtensions.length > 0) {
    const ext = path.extname(validatedPath).toLowerCase();
    if (!allowedExtensions.includes(ext)) {
      throw new Error(`File extension ${ext} is not allowed. Allowed extensions: ${allowedExtensions.join(', ')}`);
    }
  }
  
  // Ensure the directory exists
  const dir = path.dirname(validatedPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  return validatedPath;
}
