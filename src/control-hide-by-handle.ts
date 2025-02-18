import { HWND, INT } from './@types';
import { autoit } from './autoit/autoit';

export function ControlHideByHandle(windowHandle: bigint, controlHandle: bigint): number {
  return autoit.invoke('AU3_ControlHideByHandle', INT, [HWND, HWND], [windowHandle, controlHandle]);
}
