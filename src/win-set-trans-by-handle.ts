import { HWND, INT } from './@types';
import { autoit } from './lib/autoit';

export function WinSetTransByHandle(windowHandle: bigint, transparency: number): number {
  return autoit.invoke('AU3_WinSetTransByHandle', INT, [HWND, INT], [windowHandle, transparency]);
}
