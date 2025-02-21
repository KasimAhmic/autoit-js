import { INT, LPCWSTR } from './@types';
import { autoit } from './lib/autoit';

export function WinWaitClose(windowTitle: string, windowText: string = '', timeout: number = 0): number {
  return autoit.invoke('AU3_WinWaitClose', INT, [LPCWSTR, LPCWSTR, INT], [windowTitle, windowText, timeout]);
}
