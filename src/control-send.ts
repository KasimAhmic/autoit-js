import { INT, LPCWSTR } from './@types/win32';
import { autoit } from './autoit/autoit';
import { SendMode } from './send';

export function ControlSend(
  windowTitle: string,
  windowText: string,
  control: string,
  value: string,
  mode: SendMode = SendMode.Default,
): number {
  return autoit.invoke(
    'AU3_ControlSend',
    INT,
    [LPCWSTR, LPCWSTR, LPCWSTR, LPCWSTR, INT],
    [windowTitle, windowText, control, value, mode],
  );
}
