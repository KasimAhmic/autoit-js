import koffi from 'koffi';

import { INT, IPoint, LPPOINT, Point } from './@types';
import { autoit } from './autoit/autoit';

export function WinGetCaretPos(): IPoint {
  const point = new Point();

  autoit.invoke('AU3_WinGetCaretPos', INT, [koffi.out(LPPOINT)], [point]);

  return point;
}
