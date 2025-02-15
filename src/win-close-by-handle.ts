import { HWND, INT } from './@types/win32';
import { autoit } from './autoit/autoit';

export function WinCloseByHandle(windowHandle: number): number {
  return autoit.invoke('AU3_WinCloseByHandle', INT, [HWND], [windowHandle]);
}
