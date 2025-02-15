import koffi from 'koffi';

import { IPoint, LPPOINT, Point } from './@types/point';
import { VOID } from './@types/win32';
import { autoit } from './autoit/autoit';

export function MouseGetPos(): IPoint {
  const point = new Point();

  autoit.invoke('AU3_MouseGetPos', VOID, [koffi.out(LPPOINT)], [point]);

  return point;
}
