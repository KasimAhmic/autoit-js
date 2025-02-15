import { INT, LPCWSTR } from './@types/win32';
import { autoit } from './autoit/autoit';
import { MouseButton } from './mouse-click';

export function MouseClickDrag(
  button: MouseButton,
  fromX: number,
  fromY: number,
  toX: number,
  toY: number,
  speed: number = -1,
): number {
  return autoit.invoke(
    'AU3_MouseClickDrag',
    INT,
    [LPCWSTR, INT, INT, INT, INT, INT],
    [button, fromX, fromY, toX, toY, speed],
  );
}
