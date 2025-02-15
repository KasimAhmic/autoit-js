import { HWND, INT } from './@types';
import { autoit } from './autoit/autoit';
import { OnTop } from './win-set-on-top';

export function WinSetOnTopByHandle(windowHandle: bigint, flag: OnTop): number {
  return autoit.invoke('AU3_WinSetOnTopByHandle', INT, [HWND, INT], [windowHandle, flag]);
}
