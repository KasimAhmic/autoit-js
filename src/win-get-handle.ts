import { INT, LPCWSTR } from './@types/win32';
import { autoit } from './autoit/autoit';

export function WinGetHandle(title: string, text: string = ''): number {
  return autoit.invoke('AU3_WinGetHandle', INT, [LPCWSTR, LPCWSTR], [title, text]);
}
