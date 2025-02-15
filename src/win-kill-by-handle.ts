import { HWND, INT } from './@types';
import { autoit } from './autoit/autoit';

export function WinKillByHandle(windowHandle: bigint): number {
  return autoit.invoke('AU3_WinKillByHandle', INT, [HWND], [windowHandle]);
}
