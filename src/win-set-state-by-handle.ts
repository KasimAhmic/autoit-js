import { HWND, INT } from './@types/win32';
import { autoit } from './autoit/autoit';
import { SetStateFlag } from './win-set-state';

export function WinSetStateByHandle(windowHandle: number, flags: SetStateFlag): number {
  return autoit.invoke('AU3_WinSetStateByHandle', INT, [HWND, INT], [windowHandle, flags]);
}
