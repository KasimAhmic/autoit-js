import koffi from 'koffi';

import { IRect, LPRECT, Rect } from './@types/rect';
import { HWND, VOID } from './@types/win32';
import { autoit } from './autoit/autoit';

export function ControlGetPosByHandle(windowHandle: number, controlHandle: number): IRect {
  const rect = new Rect();

  autoit.invoke(
    'AU3_ControlGetPosByHandle',
    VOID,
    [HWND, HWND, koffi.out(LPRECT)],
    [windowHandle, controlHandle, rect],
  );

  return rect;
}
