import { DWORD, HWND } from './@types/win32';
import { autoit } from './autoit/autoit';

export function WinGetProcessByHandle(windowHandle: number): number {
  return autoit.invoke('AU3_WinGetProcessByHandle', DWORD, [HWND], [windowHandle]);
}
