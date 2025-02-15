import { HWND, INT } from './@types/win32';
import { autoit } from './autoit/autoit';

export function WinKillByHandle(windowHandle: number): number {
  return autoit.invoke('AU3_WinKillByHandle', INT, [HWND], [windowHandle]);
}
