const svg2Png = require('./applySvg2Png');
const diffSvg = require('./applyDiffSvg');
const removeEmptyCoordinates = require('./applyRemoveNanCoordinates');

module.exports = {
  svg2Png,
  diffSvg,
  removeEmptyCoordinates,
};