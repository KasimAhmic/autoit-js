import { HWND, INT } from './@types/win32';
import { autoit } from './autoit/autoit';

export function ControlHideByHandle(windowHandle: number, controlHandle: number): number {
  return autoit.invoke('AU3_ControlHideByHandle', INT, [HWND, HWND], [windowHandle, controlHandle]);
}
