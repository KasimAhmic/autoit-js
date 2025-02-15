import { HWND, INT } from './@types';
import { autoit } from './autoit/autoit';

export function WinMoveByHandle(
  windowHandle: bigint,
  x: number,
  y: number,
  width: number = -1,
  height: number = -1,
): number {
  return autoit.invoke(
    'AU3_WinMoveByHandle',
    INT,
    [HWND, INT, INT, INT, INT],
    [windowHandle, x, y, width, height],
  );
}
