import { DWORD, LPCWSTR } from './@types/win32';
import { autoit } from './autoit/autoit';

export function WinGetProcess(title: string, text: string = ''): number {
  return autoit.invoke('AU3_WinGetProcess', DWORD, [LPCWSTR, LPCWSTR], [title, text]);
}
