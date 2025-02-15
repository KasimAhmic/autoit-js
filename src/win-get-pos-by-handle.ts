import koffi from 'koffi';

import { IRect, LPRECT, Rect } from './@types/rect';
import { HWND, VOID } from './@types/win32';
import { autoit } from './autoit/autoit';

export function WinGetPosByHandle(windowHandle: number): IRect {
  const rect = new Rect();

  autoit.invoke('AU3_WinGetPosByHandle', VOID, [HWND, koffi.out(LPRECT)], [windowHandle, rect]);

  return rect;
}
