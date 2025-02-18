import { HWND, INT } from './@types';
import { autoit } from './autoit/autoit';

export function ControlFocusByHandle(windowHandle: bigint, controlHandle: bigint): number {
  return autoit.invoke('AU3_ControlFocusByHandle', INT, [HWND, HWND], [windowHandle, controlHandle]);
}
