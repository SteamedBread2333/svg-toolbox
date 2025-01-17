"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
/**
 * @file applyDiffSvg.js
 * @description This module provides a function to compare two PNG images and generate a diff image using the sharp and pixelmatch libraries.
 * @module applyDiffSvg
 * @requires sharp - Image processing library
 * @requires pixelmatch - Image comparison library
 * @requires fs - File system module
 * @requires path - Path module
 * @author pipi
 */
// @ts-ignore
var fs_1 = __importDefault(require("fs"));
var sharp_1 = __importDefault(require("sharp"));
// @ts-ignore
var pngjs_1 = __importDefault(require("pngjs"));
// @ts-ignore
var path_1 = __importDefault(require("path"));
//  @ts-ignore
var pixelmatch_1 = __importDefault(require("pixelmatch"));
var PNG = pngjs_1.default.PNG;
/**
 * Checks if the filename has a valid suffix.
 * @param {string} filename - The name of the file.
 * @returns {boolean} - True if the filename has a suffix, false otherwise.
 */
function validSuffix(filename) {
    return path_1.default.extname(filename) !== '';
}
/**
 * Compares two SVG files and generates a diff image.
 * @param {string} pathA - The path of the first SVG file.
 * @param {string} pathB - The path of the second SVG file.
 * @param {string} diffFilePath - The path to save the diff image.
 * @returns - The diff image buffer and the number of different pixels.
 */
function default_1(pathA, pathB, diffFilePath) {
    return __awaiter(this, void 0, void 0, function () {
        var pngA, pngB, img1, img2, width, height, diff, numDiffPixels, diffPngBuffer, diffFileName;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, sharp_1.default)(pathA).toBuffer()];
                case 1:
                    pngA = _a.sent();
                    return [4 /*yield*/, (0, sharp_1.default)(pathB).toBuffer()];
                case 2:
                    pngB = _a.sent();
                    img1 = PNG.sync.read(pngA);
                    img2 = PNG.sync.read(pngB);
                    width = img1.width, height = img1.height;
                    diff = new PNG({ width: width, height: height });
                    numDiffPixels = (0, pixelmatch_1.default)(img1.data, img2.data, diff.data, width, height, { threshold: 0.1 });
                    diffPngBuffer = PNG.sync.write(diff);
                    // If a diff file path is provided, save the diff image
                    if (diffFilePath) {
                        diffFileName = path_1.default.basename(diffFilePath);
                        if (!validSuffix(diffFileName)) {
                            console.error("Error converting ".concat(diffFileName, " to PNG: No suffix found."));
                            return [2 /*return*/];
                        }
                        fs_1.default.writeFileSync(diffFilePath, diffPngBuffer);
                        // Log the result
                        if (numDiffPixels === 0) {
                            console.log("\u001B[32mFile name: ".concat(diffFileName, " Number of different pixels: ").concat(numDiffPixels, "\u001B[0m"));
                        }
                        else {
                            console.log("\u001B[33mFile name: ".concat(diffFileName, " Number of different pixels: ").concat(numDiffPixels, "\u001B[0m"));
                        }
                    }
                    return [2 /*return*/, { diffPngBuffer: diffPngBuffer, numDiffPixels: numDiffPixels }];
            }
        });
    });
}
//# sourceMappingURL=applyDiffSvg.js.map