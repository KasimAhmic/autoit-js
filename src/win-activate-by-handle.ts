import { HWND, INT } from './@types';
import { autoit } from './lib/autoit';

export function WinActivateByHandle(windowHandle: bigint): number {
  return autoit.invoke('AU3_WinActivateByHandle', INT, [HWND], [windowHandle]);
}
