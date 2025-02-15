import { HWND, INT } from './@types/win32';
import { autoit } from './autoit/autoit';

export function ControlShowByHandle(windowHandle: number, controlHandle: number): number {
  return autoit.invoke('AU3_ControlShowByHandle', INT, [HWND, HWND], [windowHandle, controlHandle]);
}
