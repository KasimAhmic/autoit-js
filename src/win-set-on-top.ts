import { INT, LPCWSTR } from './@types';
import { autoit } from './lib/autoit';

export enum OnTop {
  Yes = 0,
  No = 1,
}

export function WinSetOnTop(windowTitle: string, windowText: string = '', flag: OnTop): number {
  return autoit.invoke('AU3_WinSetOnTop', INT, [LPCWSTR, LPCWSTR, INT], [windowTitle, windowText, flag]);
}
