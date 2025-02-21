import { INT, LPCWSTR } from './@types';
import { autoit } from './lib/autoit';

export enum StateFlag {
  Hide = 0,
  Show = 5,
  Minimize = 6,
  Maximize = 3,
  Restore = 9,
  // Disable = ?, TODO: Find out what this value is
  // Enable = ?, TODO: Find out what this value is
}

export function WinSetState(windowTitle: string, windowText: string = '', flags: StateFlag): number {
  return autoit.invoke('AU3_WinSetState', INT, [LPCWSTR, LPCWSTR, INT], [windowTitle, windowText, flags]);
}
