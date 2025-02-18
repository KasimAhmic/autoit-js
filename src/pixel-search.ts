import koffi from 'koffi';

import { INT, IPoint, LPPOINT, LPRECT, Point, Rect, VOID } from './@types';
import { autoit } from './autoit/autoit';

/**
 * **BROKEN**
 *
 * @deprecated The underlying AU3_PixelSearch function is broken and results in random segfaults. I will
 * eventually rewrite this function to do a bunch of AU3_PixelGetColor calls instead. This will be
 * _significantly_ slower, but it will be stable.
 *
 * @see https://www.autoitscript.com/forum/topic/210967-autoitx-au3_pixelsearch-access-violation/
 * @see https://www.autoitscript.com/forum/topic/210967-autoitx-au3_pixelsearch-access-violation/#comment-1525551
 *
 * @param left
 * @param top
 * @param right
 * @param bottom
 * @param color
 * @param shadeVariation
 * @param step
 *
 * @returns
 */
export function PixelSearch(
  left: number,
  top: number,
  right: number,
  bottom: number,
  color: number,
  shadeVariation: number = 0,
  step: number = 1,
): IPoint {
  const point = new Point();
  const rect = new Rect({ left, top, right, bottom });

  autoit.invoke(
    'AU3_PixelSearch',
    VOID,
    // TODO: LPRECT may need to be koffi.inout(LPRECT)
    [LPRECT, INT, INT, INT, koffi.out(LPPOINT)],
    [rect, color, shadeVariation, step, point],
  );

  return point;
}
