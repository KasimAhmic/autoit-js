import { INT, LPCWSTR } from './@types';
import { autoit } from './lib/autoit';
import { SendMode } from './send';

export function ControlSend(
  windowTitle: string,
  windowText: string,
  controlId: string,
  value: string,
  mode: SendMode = SendMode.Default,
): number {
  return autoit.invoke(
    'AU3_ControlSend',
    INT,
    [LPCWSTR, LPCWSTR, LPCWSTR, LPCWSTR, INT],
    [windowTitle, windowText, controlId, value, mode],
  );
}
