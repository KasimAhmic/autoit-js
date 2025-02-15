import { HWND, INT, LPCWSTR } from './@types/win32';
import { autoit } from './autoit/autoit';

export function ControlSetTextByHandle(windowHandle: number, controlHandle: number, value: string): number {
  return autoit.invoke(
    'AU3_ControlSetTextByHandle',
    INT,
    [HWND, HWND, LPCWSTR],
    [windowHandle, controlHandle, value],
  );
}
