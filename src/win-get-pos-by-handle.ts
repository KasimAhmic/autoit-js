import koffi from 'koffi';

import { IRect, LPRECT, Rect } from './@types/rect';
import { HWND, INT } from './@types/win32';
import { autoit } from './autoit/autoit';

export function WinGetPosByHandle(windowHandle: bigint): IRect {
  const rect = new Rect();

  autoit.invoke('AU3_WinGetPosByHandle', INT, [HWND, koffi.out(LPRECT)], [windowHandle, rect]);

  return rect;
}
