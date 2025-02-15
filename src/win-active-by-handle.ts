import { HWND, INT } from './@types/win32';
import { autoit } from './autoit/autoit';

export function WinActiveByHandle(windowHandle: number): number {
  return autoit.invoke('AU3_WinActiveByHandle', INT, [HWND], [windowHandle]);
}
