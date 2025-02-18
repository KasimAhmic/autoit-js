import { INT, LPCWSTR } from './@types';
import { autoit } from './autoit/autoit';

export function WinActive(windowTitle: string, windowText: string = ''): number {
  return autoit.invoke('AU3_WinActive', INT, [LPCWSTR, LPCWSTR], [windowTitle, windowText]);
}
