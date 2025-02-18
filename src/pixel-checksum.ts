import koffi from 'koffi';

import { INT, LPRECT, Rect, UINT } from './@types';
import { autoit } from './autoit/autoit';

export function PixelChecksum(
  left: number,
  top: number,
  right: number,
  bottom: number,
  step: number = 1,
): number {
  const rect = new Rect({ left, top, right, bottom });

  return autoit.invoke('AU3_PixelChecksum', UINT, [koffi.inout(LPRECT), INT], [rect, step]);
}
