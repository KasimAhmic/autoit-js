import { HWND, INT } from './@types/win32';
import { autoit } from './autoit/autoit';

export function WinSetTransByHandle(windowHandle: number, transparency: number): number {
  return autoit.invoke('AU3_WinSetTransByHandle', INT, [HWND, INT], [windowHandle, transparency]);
}
