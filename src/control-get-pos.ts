import koffi from 'koffi';

import { IRect, LPRECT, Rect } from './@types/rect';
import { LPCWSTR, VOID } from './@types/win32';
import { autoit } from './autoit/autoit';

export function ControlGetPos(title: string, text: string, control: string): IRect {
  const rect = new Rect();

  autoit.invoke(
    'AU3_ControlGetPos',
    VOID,
    [LPCWSTR, LPCWSTR, LPCWSTR, koffi.out(LPRECT)],
    [title, text, control, rect],
  );

  return rect;
}
