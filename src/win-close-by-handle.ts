import { HWND, INT } from './@types';
import { autoit } from './autoit/autoit';

export function WinCloseByHandle(windowHandle: bigint): number {
  return autoit.invoke('AU3_WinCloseByHandle', INT, [HWND], [windowHandle]);
}
