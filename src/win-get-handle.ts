import { INT, LPCWSTR } from './@types/win32';
import { autoit } from './autoit/autoit';

export function WinGetHandle(title: string, text: string | null = null): number {
  return autoit.invoke('AU3_WinGetHandle', INT, [LPCWSTR, LPCWSTR], [title, text]);
}
