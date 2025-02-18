import { HWND, INT, LPCWSTR } from './@types';
import { autoit } from './autoit/autoit';
import { MouseButton } from './mouse-click';
import { AU3_INTDEFAULT } from './util/constants';

export function ControlClickByHandle(
  windowHandle: bigint,
  controlHandle: bigint,
  button: MouseButton = MouseButton.Left,
  clicks: number = 1,
  x: number = AU3_INTDEFAULT,
  y: number = AU3_INTDEFAULT,
): number {
  return autoit.invoke(
    'AU3_ControlClickByHandle',
    INT,
    [HWND, HWND, LPCWSTR, INT, INT, INT],
    [windowHandle, controlHandle, button, clicks, x, y],
  );
}
