import { INT, LPCWSTR } from './@types/win32';
import { autoit } from './autoit/autoit';

export function WinMove(
  title: string,
  text: string = '',
  x: number,
  y: number,
  width: number = -1,
  height: number = -1,
): number {
  return autoit.invoke(
    'AU3_WinMove',
    INT,
    [LPCWSTR, LPCWSTR, INT, INT, INT, INT],
    [title, text, x, y, width, height],
  );
}
