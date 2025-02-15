import koffi from 'koffi';

import { IRect, LPRECT, Rect } from './@types/rect';
import { LPCWSTR, VOID } from './@types/win32';
import { autoit } from './autoit/autoit';

export function WinGetClientSize(szTitle: string, szText: string = ''): IRect {
  const rect = new Rect();

  autoit.invoke('AU3_WinGetClientSize', VOID, [LPCWSTR, LPCWSTR, koffi.out(LPRECT)], [szTitle, szText, rect]);

  return rect;
}
