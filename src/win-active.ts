import { INT, LPCWSTR } from './@types/win32';
import { autoit } from './autoit/autoit';

export function WinActive(title: string, text: string = ''): number {
  return autoit.invoke('AU3_WinActive', INT, [LPCWSTR, LPCWSTR], [title, text]);
}
