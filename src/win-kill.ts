import { INT, LPCWSTR } from './@types/win32';
import { autoit } from './autoit/autoit';

export function WinKill(title: string, text: string = ''): number {
  return autoit.invoke('AU3_WinKill', INT, [LPCWSTR, LPCWSTR], [title, text]);
}
