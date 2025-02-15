import { INT, LPCWSTR } from './@types/win32';
import { autoit } from './autoit/autoit';

export enum WinSetOnTopFlag {
  NoTopMost = 0,
  TopMost = 1,
}

export function WinSetOnTop(title: string, text: string = '', flag: WinSetOnTopFlag): number {
  return autoit.invoke('AU3_WinSetOnTop', INT, [LPCWSTR, LPCWSTR, INT], [title, text, flag]);
}
