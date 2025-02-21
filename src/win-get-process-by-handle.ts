import { DWORD, HWND } from './@types';
import { autoit } from './lib/autoit';

export function WinGetProcessByHandle(windowHandle: bigint): number {
  return autoit.invoke('AU3_WinGetProcessByHandle', DWORD, [HWND], [windowHandle]);
}
