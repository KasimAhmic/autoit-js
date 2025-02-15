import { INT, LPCWSTR } from './@types/win32';
import { autoit } from './autoit/autoit';

export function WinGetProcess(title: string, text: string = ''): number {
  return autoit.invoke('AU3_WinGetProcess', INT, [LPCWSTR, LPCWSTR], [title, text]);
}
