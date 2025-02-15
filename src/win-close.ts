import { INT, LPCWSTR } from './@types/win32';
import { autoit } from './autoit/autoit';

export function WinClose(title: string, text: string = ''): number {
  return autoit.invoke('AU3_WinClose', INT, [LPCWSTR, LPCWSTR], [title, text]);
}
