import { INT, LPCWSTR } from './@types/win32';
import { autoit } from './autoit/autoit';

export enum OnTop {
  Yes = 0,
  No = 1,
}

export function WinSetOnTop(title: string, text: string = '', flag: OnTop): number {
  return autoit.invoke('AU3_WinSetOnTop', INT, [LPCWSTR, LPCWSTR, INT], [title, text, flag]);
}
