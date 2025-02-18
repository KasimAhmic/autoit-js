import { HWND, INT } from './@types';
import { autoit } from './autoit/autoit';

export function WinActiveByHandle(windowHandle: bigint): number {
  return autoit.invoke('AU3_WinActiveByHandle', INT, [HWND], [windowHandle]);
}
