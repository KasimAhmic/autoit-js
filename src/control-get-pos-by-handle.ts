import koffi from 'koffi';

import { HWND, INT, IRect, LPRECT, Rect } from './@types';
import { autoit } from './lib/autoit';

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
