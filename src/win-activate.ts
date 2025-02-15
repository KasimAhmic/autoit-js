import { INT, LPCWSTR } from './@types/win32';
import { autoit } from './autoit/autoit';

export function WinActivate(windowTitle: string, windowText: string = ''): number {
  return autoit.invoke('AU3_WinActivate', INT, [LPCWSTR, LPCWSTR], [windowTitle, windowText]);
}
