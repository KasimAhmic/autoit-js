import { INT } from './@types/win32';
import { autoit } from './autoit/autoit';
import { WinSetOnTopFlag } from './win-set-on-top';

export function WinSetOnTopByHandle(windowHandle: number, flag: WinSetOnTopFlag): number {
  return autoit.invoke('AU3_WinSetOnTopByHandle', INT, [INT, INT], [windowHandle, flag]);
}
