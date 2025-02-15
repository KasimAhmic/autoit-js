import { HWND, INT } from './@types/win32';
import { autoit } from './autoit/autoit';

export function WinWaitByHandle(windowHandle: number, timeout: number = 0): number {
  return autoit.invoke('AU3_WinWaitByHandle', INT, [HWND, INT], [windowHandle, timeout]);
}
