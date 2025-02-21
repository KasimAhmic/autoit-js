import { DWORD, LPCWSTR } from './@types';
import { autoit } from './lib/autoit';

export function WinGetProcess(windowTitle: string, windowText: string = ''): number {
  return autoit.invoke('AU3_WinGetProcess', DWORD, [LPCWSTR, LPCWSTR], [windowTitle, windowText]);
}
