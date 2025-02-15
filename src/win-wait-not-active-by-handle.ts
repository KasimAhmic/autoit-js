import { HWND, INT } from './@types/win32';
import { autoit } from './autoit/autoit';

export function WinWaitNotActiveByHandle(windowHandle: bigint, timeout: number = 0): number {
  return autoit.invoke('AU3_WinWaitNotActiveByHandle', INT, [HWND, INT], [windowHandle, timeout]);
}
