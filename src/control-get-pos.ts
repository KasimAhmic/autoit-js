import koffi from 'koffi';

import { IRect, LPRECT, Rect } from './@types/rect';
import { INT, LPCWSTR } from './@types/win32';
import { autoit } from './autoit/autoit';

export function ControlGetPos(windowTitle: string, windowText: string, controlId: string): IRect {
  const rect = new Rect();

  autoit.invoke(
    'AU3_ControlGetPos',
    INT,
    [LPCWSTR, LPCWSTR, LPCWSTR, koffi.out(LPRECT)],
    [windowTitle, windowText, controlId, rect],
  );

  return rect;
}
