import { HWND, INT, LPCWSTR } from './@types';
import { autoit } from './autoit/autoit';

export function ControlSetTextByHandle(windowHandle: bigint, controlHandle: bigint, value: string): number {
  return autoit.invoke(
    'AU3_ControlSetTextByHandle',
    INT,
    [HWND, HWND, LPCWSTR],
    [windowHandle, controlHandle, value],
  );
}
