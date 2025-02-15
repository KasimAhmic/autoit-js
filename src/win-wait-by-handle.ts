import { HWND, INT } from './@types';
import { autoit } from './autoit/autoit';

export function WinWaitByHandle(windowHandle: bigint, timeout: number = 0): number {
  return autoit.invoke('AU3_WinWaitByHandle', INT, [HWND, INT], [windowHandle, timeout]);
}
