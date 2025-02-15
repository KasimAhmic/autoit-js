import { INT, LPCWSTR } from './@types/win32';
import { autoit } from './autoit/autoit';

export function WinKill(windowTitle: string, windowText: string = ''): number {
  return autoit.invoke('AU3_WinKill', INT, [LPCWSTR, LPCWSTR], [windowTitle, windowText]);
}
