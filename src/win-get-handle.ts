import koffi from 'koffi';

import { HWND, LPCWSTR } from './@types';
import { autoit } from './lib/autoit';

export function WinGetHandle(windowTitle: string, windowText: string = ''): bigint {
  const handleRef = autoit.invoke('AU3_WinGetHandle', HWND, [LPCWSTR, LPCWSTR], [windowTitle, windowText]);

  return koffi.address(handleRef);
}
