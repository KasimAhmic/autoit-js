import { HWND, INT } from './@types';
import { autoit } from './autoit/autoit';

export function ControlShowByHandle(windowHandle: bigint, controlHandle: bigint): number {
  return autoit.invoke('AU3_ControlShowByHandle', INT, [HWND, HWND], [windowHandle, controlHandle]);
}
