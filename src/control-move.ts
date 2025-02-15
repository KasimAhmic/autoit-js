import { INT, LPCWSTR } from './@types/win32';
import { autoit } from './autoit/autoit';

export function ControlMove(
  title: string,
  text: string,
  control: string,
  x: number,
  y: number,
  width: number = -1,
  height: number = -1,
): number {
  return autoit.invoke(
    'AU3_ControlMove',
    INT,
    [LPCWSTR, LPCWSTR, LPCWSTR, INT, INT, INT, INT],
    [title, text, control, x, y, width, height],
  );
}
