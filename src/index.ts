import svg2Png from './extra-apply/applySvg2Png';
import diffSvg from './extra-apply/applyDiffSvg';
import removeNanCoordinates from './extra-apply/applyRemoveNanCoordinates';
import { createSVGElement, cloneSVGElement, mergeSVGElements, convertSVGToBase64, convertBase64ToSVG } from './common'
import pixelLevelDiffPng from './utils/pixelLevelDiffPng';

const removeEmptyCoordinates = removeNanCoordinates

export {
  svg2Png,
  diffSvg,
  /**
   * @deprecated
   * @see removeNanCoordinates
   */
  removeEmptyCoordinates,
  removeNanCoordinates,
  createSVGElement, cloneSVGElement, mergeSVGElements, convertSVGToBase64, convertBase64ToSVG,
  pixelLevelDiffPng
};