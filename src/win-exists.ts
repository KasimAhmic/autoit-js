import { INT, LPCWSTR } from './@types/win32';
import { autoit } from './autoit/autoit';

export function WinExists(title: string, text: string = ''): boolean {
  return autoit.invoke('AU3_WinExists', INT, [LPCWSTR, LPCWSTR], [title, text]) === 1;
}
