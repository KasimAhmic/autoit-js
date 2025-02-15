import { INT, LPCWSTR } from './@types/win32';
import { autoit } from './autoit/autoit';

export function WinMove(
  windowTitle: string,
  windowText: string = '',
  x: number,
  y: number,
  width: number = -1,
  height: number = -1,
): number {
  return autoit.invoke(
    'AU3_WinMove',
    INT,
    [LPCWSTR, LPCWSTR, INT, INT, INT, INT],
    [windowTitle, windowText, x, y, width, height],
  );
}
