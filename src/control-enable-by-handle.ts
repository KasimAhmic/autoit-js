import { HWND, INT } from './@types';
import { autoit } from './autoit/autoit';

export function ControlEnableByHandle(windowHandle: bigint, controlHandle: bigint): number {
  return autoit.invoke('AU3_ControlEnableByHandle', INT, [HWND, HWND], [windowHandle, controlHandle]);
}
