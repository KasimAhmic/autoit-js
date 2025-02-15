import { INT, LPCWSTR } from './@types/win32';
import { autoit } from './autoit/autoit';

export function WinSetTitle(title: string, text: string = '', newTitle: string): number {
  return autoit.invoke('AU3_WinSetTitle', INT, [LPCWSTR, LPCWSTR, LPCWSTR], [title, text, newTitle]);
}
