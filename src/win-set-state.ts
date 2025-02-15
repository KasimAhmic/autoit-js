import { INT, LPCWSTR } from './@types/win32';
import { autoit } from './autoit/autoit';

export enum SetStateFlag {
  Hide = 0,
  Show = 5,
  Minimize = 6,
  Maximize = 3,
  Restore = 9,
  // Disable = ?, TODO: Find out what this value is
  // Enable = ?, TODO: Find out what this value is
}

export function WinSetState(title: string, text: string = '', flags: SetStateFlag): number {
  return autoit.invoke('AU3_WinSetState', INT, [LPCWSTR, LPCWSTR, INT], [title, text, flags]);
}
