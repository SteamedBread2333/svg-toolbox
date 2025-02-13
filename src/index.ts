import svg2Png from './applySvg2Png';
import diffSvg from './applyDiffSvg';
import removeEmptyCoordinates from './applyRemoveNanCoordinates';
import { createSVGElement, cloneSVGElement, mergeSVGElements, convertSVGToBase64, convertBase64ToSVG } from './utils'

export {
  svg2Png,
  diffSvg,
  removeEmptyCoordinates,
  createSVGElement, cloneSVGElement, mergeSVGElements, convertSVGToBase64, convertBase64ToSVG
};