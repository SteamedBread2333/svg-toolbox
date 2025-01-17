/**
 * Compares two SVG files and generates a diff image.
 * @param {string} pathA - The path of the first SVG file.
 * @param {string} pathB - The path of the second SVG file.
 * @param {string} diffFilePath - The path to save the diff image.
 * @returns - The diff image buffer and the number of different pixels.
 */
export default function (pathA: string, pathB: string, diffFilePath: string): Promise<{
    diffPngBuffer: ArrayBuffer;
    numDiffPixels: number;
} | void>;
