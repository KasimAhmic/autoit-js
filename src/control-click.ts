import { INT, LPCWSTR } from './@types/win32';
import { autoit } from './autoit/autoit';
import { MouseButton } from './mouse-click';
import { AU3_INTDEFAULT } from './util/constants';

export function ControlClick(
  title: string,
  text: string,
  control: string,
  button: MouseButton = MouseButton.Left,
  clicks: number = 1,
  x: number = AU3_INTDEFAULT,
  y: number = AU3_INTDEFAULT,
): number {
  return autoit.invoke(
    'AU3_ControlClick',
    INT,
    [LPCWSTR, LPCWSTR, LPCWSTR, LPCWSTR, INT, INT, INT],
    [title, text, control, button, clicks, x, y],
  );
}
