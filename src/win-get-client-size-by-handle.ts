import koffi from 'koffi';

import { HWND, INT, IRect, LPRECT, Rect } from './@types';
import { autoit } from './autoit/autoit';

export function WinGetClientSizeByHandle(windowHandle: bigint): IRect {
  const rect = new Rect();

  autoit.invoke('AU3_WinGetClientSizeByHandle', INT, [HWND, koffi.out(LPRECT)], [windowHandle, rect]);

  return rect;
}
