import { HWND, INT, LPCWSTR } from './@types/win32';
import { autoit } from './autoit/autoit';

export function WinSetTitleByHandle(windowHandle: number, newTitle: string): number {
  return autoit.invoke('AU3_WinSetTitleByHandle', INT, [HWND, LPCWSTR], [windowHandle, newTitle]);
}
