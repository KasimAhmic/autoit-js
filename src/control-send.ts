import { INT, LPCWSTR } from './@types/win32';
import { autoit } from './autoit/autoit';
import { SendMode } from './send';

export function ControlSend(
  title: string,
  text: string,
  control: string,
  value: string,
  mode: SendMode = SendMode.Default,
): number {
  return autoit.invoke(
    'AU3_ControlSend',
    INT,
    [LPCWSTR, LPCWSTR, LPCWSTR, LPCWSTR, INT],
    [title, text, control, value, mode],
  );
}
