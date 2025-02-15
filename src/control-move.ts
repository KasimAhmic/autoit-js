import { INT, LPCWSTR } from './@types/win32';
import { autoit } from './autoit/autoit';

export function ControlMove(
  windowTitle: string,
  windowText: string,
  controlId: string,
  x: number,
  y: number,
  width: number = -1,
  height: number = -1,
): number {
  return autoit.invoke(
    'AU3_ControlMove',
    INT,
    [LPCWSTR, LPCWSTR, LPCWSTR, INT, INT, INT, INT],
    [windowTitle, windowText, controlId, x, y, width, height],
  );
}
