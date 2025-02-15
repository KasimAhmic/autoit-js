import koffi from 'koffi';

import { IRect, LPRECT, Rect } from './@types/rect';
import { HWND, VOID } from './@types/win32';
import { autoit } from './autoit/autoit';

export function WinGetClientSizeByHandle(windowHandle: number): IRect {
  const rect = new Rect();

  autoit.invoke('AU3_WinGetClientSizeByHandle', VOID, [HWND, koffi.out(LPRECT)], [windowHandle, rect]);

  return rect;
}
