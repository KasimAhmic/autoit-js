import koffi from 'koffi';

import { IRect, LPRECT, Rect } from './@types/rect';
import { INT, LPCWSTR } from './@types/win32';
import { autoit } from './autoit/autoit';

export function WinGetPos(title: string, text: string = ''): IRect {
  const rect = new Rect();

  autoit.invoke('AU3_WinGetPos', INT, [LPCWSTR, LPCWSTR, koffi.out(LPRECT)], [title, text, rect]);

  return rect;
}
