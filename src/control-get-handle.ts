import koffi from 'koffi';

import { HWND, LPCWSTR } from './@types/win32';
import { autoit } from './autoit/autoit';

export function ControlGetHandle(windowHandle: bigint, controlId: string): bigint {
  const handleRef = autoit.invoke('AU3_ControlGetHandle', HWND, [HWND, LPCWSTR], [windowHandle, controlId]);

  return koffi.address(handleRef);
}
