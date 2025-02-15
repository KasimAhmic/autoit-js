import koffi from 'koffi';

import { IPoint, LPPOINT, Point } from './@types/point';
import { VOID } from './@types/win32';
import { autoit } from './autoit/autoit';

export function WinGetCaretPos(): IPoint {
  const point = new Point();

  autoit.invoke('AU3_WinGetCaretPos', VOID, [koffi.out(LPPOINT)], [point]);

  return point;
}
