import { INT, LPCWSTR } from './@types';
import { autoit } from './autoit/autoit';

export function WinClose(windowTitle: string, windowText: string = ''): number {
  return autoit.invoke('AU3_WinClose', INT, [LPCWSTR, LPCWSTR], [windowTitle, windowText]);
}
