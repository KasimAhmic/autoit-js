import { AU3_INTDEFAULT, INT, LPCWSTR } from './@types/win32';
import { autoit } from './autoit/autoit';

export enum MouseButton {
  Left = 'left',
  Middle = 'middle',
  Right = 'right',
  Primary = 'primary',
  Main = 'main',
  Secondary = 'secondary',
  Menu = 'menu',
}

export function MouseClick(
  button: MouseButton = MouseButton.Left,
  x: number = AU3_INTDEFAULT,
  y: number = AU3_INTDEFAULT,
  clicks: number = 1,
  speed: number = -1,
): number {
  return autoit.invoke('AU3_MouseClick', INT, [LPCWSTR, INT, INT, INT, INT], [button, x, y, clicks, speed]);
}
