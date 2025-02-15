import { INT, LPCWSTR } from './@types';
import { autoit } from './autoit/autoit';

export function WinExists(windowTitle: string, windowText: string = ''): boolean {
  return autoit.invoke('AU3_WinExists', INT, [LPCWSTR, LPCWSTR], [windowTitle, windowText]) === 1;
}
