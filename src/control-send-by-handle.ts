import { HWND, INT, LPCWSTR } from './@types/win32';
import { autoit } from './autoit/autoit';
import { SendMode } from './send';

export function ControlSendByHandle(
  windowHandle: number,
  controlHandle: number,
  value: string,
  mode: SendMode = SendMode.Default,
): number {
  return autoit.invoke(
    'AU3_ControlSendByHandle',
    INT,
    [HWND, HWND, LPCWSTR, INT],
    [windowHandle, controlHandle, value, mode],
  );
}
