import { HWND, INT } from './@types';
import { autoit } from './lib/autoit';

export function WinExistsByHandle(windowHandle: bigint): boolean {
  return autoit.invoke('AU3_WinExistsByHandle', INT, [HWND], [windowHandle]) === 1;
}
