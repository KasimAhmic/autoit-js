import koffi from 'koffi';

import { HWND, INT, IRect, LPRECT, Rect } from './@types';
import { autoit } from './lib/autoit';

export function WinGetPosByHandle(windowHandle: bigint): IRect {
  const rect = new Rect();

  autoit.invoke('AU3_WinGetPosByHandle', INT, [HWND, koffi.out(LPRECT)], [windowHandle, rect]);

  return rect;
}
