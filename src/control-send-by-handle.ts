import { HWND, INT, LPCWSTR } from './@types';
import { autoit } from './lib/autoit';
import { SendMode } from './send';

export function ControlSendByHandle(
  windowHandle: bigint,
  controlHandle: bigint,
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
