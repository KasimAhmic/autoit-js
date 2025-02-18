import { HWND, INT } from './@types';
import { autoit } from './autoit/autoit';

export function ControlMoveByHandle(
  windowHandle: bigint,
  controlHandle: bigint,
  x: number,
  y: number,
  width: number = -1,
  height: number = -1,
): number {
  return autoit.invoke(
    'AU3_ControlMoveByHandle',
    INT,
    [HWND, HWND, INT, INT, INT, INT],
    [windowHandle, controlHandle, x, y, width, height],
  );
}
