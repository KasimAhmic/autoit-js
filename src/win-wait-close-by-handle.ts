import { HWND, INT } from './@types';
import { autoit } from './lib/autoit';

export function WinWaitCloseByHandle(windowHandle: bigint, timeout: number = 0): number {
  return autoit.invoke('AU3_WinWaitCloseByHandle', INT, [HWND, INT], [windowHandle, timeout]);
}
