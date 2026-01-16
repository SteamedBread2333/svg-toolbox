# SVG Toolbox

一个功能全面的 SVG 操作和分析工具库，提供 SVG 元素的创建、转换、优化、比较和分析等功能。

[![npm version](https://img.shields.io/npm/v/svg-toolbox.svg?style=for-the-badge)](https://www.npmjs.com/package/svg-toolbox)
[![npm downloads](https://img.shields.io/npm/dy/svg-toolbox.svg?style=for-the-badge)](https://www.npmjs.com/package/svg-toolbox)
[![License](https://img.shields.io/github/license/SteamedBread2333/svg-toolbox.svg?style=for-the-badge)](https://www.npmjs.com/package/svg-toolbox)

## 安装

```bash
npm install svg-toolbox
```

## 适用场景

### 1. SVG 元素操作场景

当你需要在 Node.js 环境中创建、克隆或合并 SVG 元素时，可以使用核心元素操作功能：

- **动态生成 SVG 图形**：根据数据动态创建 SVG 元素
- **SVG 模板复用**：克隆现有 SVG 元素作为模板
- **组合多个 SVG**：将多个独立的 SVG 图形合并为一个

### 2. 格式转换场景

当你需要将 SVG 转换为其他格式或进行编码转换时：

- **Web 应用嵌入**：将 SVG 转换为 Base64 数据 URI，方便嵌入 HTML/CSS
- **图片导出**：将 SVG 转换为 PNG、JPG 或 WebP 格式用于下载或分享
- **跨平台兼容**：在不同系统间传输 SVG 数据时使用 Base64 编码

### 3. 视觉回归测试场景

当你需要比较 SVG 渲染结果以确保视觉一致性时：

- **自动化测试**：在 CI/CD 流程中检测 SVG 渲染变化
- **版本对比**：比较不同版本的 SVG 文件差异
- **质量保证**：确保 SVG 修改不会引入意外的视觉变化

### 4. SVG 优化场景

当你需要清理和优化 SVG 代码时：

- **性能优化**：移除无效坐标和空属性，减小文件大小
- **代码清理**：移除注释和多余空白，提高可读性
- **数据修复**：修复包含 NaN 或无效值的路径数据

### 5. SVG 分析场景

当你需要深入了解 SVG 内容时：

- **设计审查**：提取 SVG 中使用的所有颜色
- **路径分析**：分析路径命令的结构和复杂度
- **尺寸检测**：自动提取 SVG 的尺寸信息

## 功能模块

### 核心功能 (Core)

提供基础的 SVG 元素操作能力：

- `createSVGElement` - 从字符串创建 SVG 元素
- `cloneSVGElement` - 深度克隆 SVG 元素
- `mergeSVGElements` - 合并多个 SVG 元素
- `getSVGDimensions` - 获取 SVG 尺寸信息

### 转换功能 (Convert)

提供格式转换和编码功能：

- `convertSVGToBase64` - SVG 转 Base64 编码
- `convertBase64ToSVG` - Base64 解码为 SVG
- `svgToImage` - SVG 转图片格式（PNG/JPG/WebP）
- `svg2Png` - SVG 转 PNG（兼容旧版 API）

### 比较功能 (Compare)

提供图像对比和差异检测：

- `diffImages` - 比较两个图像文件并生成差异图
- `pixelLevelDiff` - 像素级别的图像差异比较
- `diffSvg` - SVG 差异比较（兼容旧版 API）

### 优化功能 (Optimize)

提供 SVG 代码优化和清理：

- `removeNanCoordinates` - 移除路径中的 NaN 坐标
- `removeEmptyAttributes` - 移除空属性
- `removeComments` - 移除注释
- `normalizeWhitespace` - 规范化空白字符
- `optimizeSVG` - 综合优化 SVG 代码

### 分析功能 (Analyze)

提供 SVG 内容分析：

- `extractColors` - 提取 SVG 中使用的颜色
- `parsePathData` - 解析路径数据
- `analyzePaths` - 分析所有路径元素
- `getPathStatistics` - 获取路径统计信息

## 使用示例

### 基础操作

```typescript
import { createSVGElement, cloneSVGElement, mergeSVGElements } from 'svg-toolbox';

// 创建 SVG 元素
const svg = createSVGElement('<svg><circle cx="50" cy="50" r="40" /></svg>');

// 克隆元素
const cloned = cloneSVGElement(svg);

// 合并多个元素
const merged = mergeSVGElements([svg, cloned]);
```

### 格式转换

```typescript
import { convertSVGToBase64, svgToImage } from 'svg-toolbox';

// 转换为 Base64
const base64 = convertSVGToBase64('<svg>...</svg>');

// 转换为 PNG
const pngBuffer = await svgToImage('input.svg', { scale: 2, format: 'png' });

// 转换为 WebP
const webpBuffer = await svgToImage('input.svg', { format: 'webp', quality: 90 });
```

### 图像比较

```typescript
import { diffImages } from 'svg-toolbox';

// 比较两个图像并生成差异图
const result = await diffImages('image1.svg', 'image2.svg', 'diff.png');
console.log(`差异像素数: ${result.numDiffPixels}`);
```

### SVG 优化

```typescript
import { optimizeSVG, removeNanCoordinates } from 'svg-toolbox';

// 综合优化
const optimized = optimizeSVG('<svg><!-- comment --><path d="M 10,20 nan L 30,40" /></svg>');

// 移除 NaN 坐标
const cleaned = removeNanCoordinates('<svg><path d="M 10,20 nan L 30,40" /></svg>');
```

### 内容分析

```typescript
import { extractColors, getPathStatistics } from 'svg-toolbox';

// 提取颜色
const colors = extractColors('<svg><circle fill="red" stroke="blue" /></svg>');

// 获取路径统计
const stats = getPathStatistics('<svg><path d="M 10,20 L 30,40 Z" /></svg>');
console.log(`路径数: ${stats.totalPaths}, 命令数: ${stats.totalCommands}`);
```

## API 文档

详细的 API 文档请参考 [TypeScript 类型定义](./src/types/index.ts) 和源代码注释。

## 开发

```bash
# 安装依赖
npm install

# 运行测试
npm test

# 构建项目
npm run build

# 监听模式测试
npm run test:watch

# 生成覆盖率报告
npm run test:coverage
```

## 许可证

MIT License
