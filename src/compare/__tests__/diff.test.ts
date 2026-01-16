import { diffImages } from '../diff';
import fs from 'fs';
import path from 'path';

describe('Image Diff', () => {
  const fixturesDir = path.join(__dirname, '../../../test-fixtures');
  const test1Path = path.join(fixturesDir, 'test1.svg');
  const test2Path = path.join(fixturesDir, 'test2.svg');
  const outputDir = path.join(fixturesDir, 'diff-output');
  const diffImagePath = path.join(outputDir, 'diff-test1-test2.png');

  beforeAll(() => {
    // Ensure output directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
  });

  afterAll(() => {
    // Clean up: optionally remove the diff image after tests
    // Uncomment the following line if you want to clean up after tests
    // if (fs.existsSync(diffImagePath)) {
    //   fs.unlinkSync(diffImagePath);
    // }
  });

  it('should generate diff image between two similar but different SVGs', async () => {
    // Verify test fixtures exist
    expect(fs.existsSync(test1Path)).toBe(true);
    expect(fs.existsSync(test2Path)).toBe(true);

    // Generate diff image
    const result = await diffImages(test1Path, test2Path, diffImagePath, 0.1);

    // Verify diff image was created
    expect(fs.existsSync(diffImagePath)).toBe(true);
    
    // Verify result contains expected properties
    expect(result).toHaveProperty('diffPngBuffer');
    expect(result).toHaveProperty('numDiffPixels');
    expect(result.diffPngBuffer).toBeInstanceOf(Buffer);
    expect(typeof result.numDiffPixels).toBe('number');
    
    // Since the SVGs are different, there should be some differences
    expect(result.numDiffPixels).toBeGreaterThan(0);
    
    // Verify the saved file matches the buffer
    const savedFile = fs.readFileSync(diffImagePath);
    expect(savedFile.equals(result.diffPngBuffer)).toBe(true);
    
    // Verify file size is reasonable (not empty)
    expect(savedFile.length).toBeGreaterThan(0);
    
    console.log(`Diff image saved to: ${diffImagePath}`);
    console.log(`Number of different pixels: ${result.numDiffPixels}`);
  });

  it('should handle identical SVGs (no differences)', async () => {
    const identicalDiffPath = path.join(outputDir, 'diff-identical.png');
    
    // Compare test1 with itself
    const result = await diffImages(test1Path, test1Path, identicalDiffPath, 0.1);
    
    // Should have no differences
    expect(result.numDiffPixels).toBe(0);
    expect(fs.existsSync(identicalDiffPath)).toBe(true);
    
    console.log(`Identical comparison diff saved to: ${identicalDiffPath}`);
    console.log(`Number of different pixels: ${result.numDiffPixels}`);
  });

  it('should generate diff without saving to file', async () => {
    const result = await diffImages(test1Path, test2Path, undefined, 0.1);
    
    // Should still return result even without file path
    expect(result).toHaveProperty('diffPngBuffer');
    expect(result).toHaveProperty('numDiffPixels');
    expect(result.numDiffPixels).toBeGreaterThan(0);
  });
});
