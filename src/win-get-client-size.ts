import koffi from 'koffi';

import { INT, IRect, LPCWSTR, LPRECT, Rect } from './@types';
import { autoit } from './lib/autoit';

export function WinGetClientSize(windowTitle: string, windowText: string = ''): IRect {
  const rect = new Rect();

  autoit.invoke(
    'AU3_WinGetClientSize',
    INT,
    [LPCWSTR, LPCWSTR, koffi.out(LPRECT)],
    [windowTitle, windowText, rect],
  );

  return rect;
}
