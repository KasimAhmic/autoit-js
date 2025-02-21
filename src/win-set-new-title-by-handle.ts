import { HWND, INT, LPCWSTR } from './@types';
import { autoit } from './lib/autoit';

export function WinSetTitleByHandle(windowHandle: bigint, newTitle: string): number {
  return autoit.invoke('AU3_WinSetTitleByHandle', INT, [HWND, LPCWSTR], [windowHandle, newTitle]);
}
