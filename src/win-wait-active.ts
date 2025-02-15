import { INT, LPCWSTR } from './@types/win32';
import { autoit } from './autoit/autoit';

export function WinWaitActive(windowTitle: string, windowText: string = '', timeout: number = 0): number {
  return autoit.invoke('AU3_WinWaitActive', INT, [LPCWSTR, LPCWSTR, INT], [windowTitle, windowText, timeout]);
}
