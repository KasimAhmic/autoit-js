import { INT, LPCWSTR } from './@types/win32';
import { autoit } from './autoit/autoit';

export function WinActivate(title: string, text: string = ''): number {
  return autoit.invoke('AU3_WinActivate', INT, [LPCWSTR, LPCWSTR], [title, text]);
}
