import koffi from 'koffi';

import { IPoint, LPPOINT, Point, VOID } from './@types';
import { autoit } from './lib/autoit';

export function MouseGetPos(): IPoint {
  const point = new Point();

  autoit.invoke('AU3_MouseGetPos', VOID, [koffi.out(LPPOINT)], [point]);

  return point;
}
