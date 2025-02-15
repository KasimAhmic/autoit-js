import { INT, LPCWSTR } from './@types/win32';
import { autoit } from './autoit/autoit';

export function WinWaitNotActive(title: string, text: string = '', timeout: number = 0): number {
  return autoit.invoke('AU3_WinWaitNotActive', INT, [LPCWSTR, LPCWSTR, INT], [title, text, timeout]);
}
