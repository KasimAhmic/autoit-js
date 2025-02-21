import { HWND, INT } from './@types';
import { autoit } from './lib/autoit';
import { StateFlag } from './win-set-state';

export function WinSetStateByHandle(windowHandle: bigint, flags: StateFlag): number {
  return autoit.invoke('AU3_WinSetStateByHandle', INT, [HWND, INT], [windowHandle, flags]);
}
