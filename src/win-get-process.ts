import { DWORD, LPCWSTR } from './@types/win32';
import { autoit } from './autoit/autoit';

export function WinGetProcess(windowTitle: string, windowText: string = ''): number {
  return autoit.invoke('AU3_WinGetProcess', DWORD, [LPCWSTR, LPCWSTR], [windowTitle, windowText]);
}
