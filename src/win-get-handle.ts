import koffi from 'koffi';

import { HWND, LPCWSTR } from './@types/win32';
import { autoit } from './autoit/autoit';

export function WinGetHandle(title: string, text: string = ''): bigint {
  const handleRef = autoit.invoke('AU3_WinGetHandle', HWND, [LPCWSTR, LPCWSTR], [title, text]);

  return koffi.address(handleRef);
}
