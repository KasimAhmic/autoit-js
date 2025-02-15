import { HWND, INT } from './@types/win32';
import { autoit } from './autoit/autoit';

export function WinActivateByHandle(windowHandle: number): number {
  return autoit.invoke('AU3_WinActivateByHandle', INT, [HWND], [windowHandle]);
}
