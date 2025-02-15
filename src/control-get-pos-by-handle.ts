import koffi from 'koffi';

import { IRect, LPRECT, Rect } from './@types/rect';
import { HWND, INT } from './@types/win32';
import { autoit } from './autoit/autoit';

export function ControlGetPosByHandle(windowHandle: bigint, controlHandle: bigint): IRect {
  const rect = new Rect();

  autoit.invoke(
    'AU3_ControlGetPosByHandle',
    INT,
    [HWND, HWND, koffi.out(LPRECT)],
    [windowHandle, controlHandle, rect],
  );

  return rect;
}
