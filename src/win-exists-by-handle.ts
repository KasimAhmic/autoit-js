import { HWND, INT } from './@types/win32';
import { autoit } from './autoit/autoit';

export function WinExistsByHandle(windowHandle: bigint): boolean {
  return autoit.invoke('AU3_WinExistsByHandle', INT, [HWND], [windowHandle]) === 1;
}
