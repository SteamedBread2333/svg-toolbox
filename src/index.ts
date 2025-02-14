import svg2Png from './applySvg2Png';
import diffSvg from './applyDiffSvg';
import removeNanCoordinates from './applyRemoveNanCoordinates';
import { createSVGElement, cloneSVGElement, mergeSVGElements, convertSVGToBase64, convertBase64ToSVG } from './utils'

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
  createSVGElement, cloneSVGElement, mergeSVGElements, convertSVGToBase64, convertBase64ToSVG
};