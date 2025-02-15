import { INT, LPCWSTR } from './@types/win32';
import { autoit } from './autoit/autoit';

export function ControlSetText(
  windowTitle: string,
  windowText: string,
  control: string,
  value: string,
): number {
  return autoit.invoke(
    'AU3_ControlSetText',
    INT,
    [LPCWSTR, LPCWSTR, LPCWSTR, LPCWSTR],
    [windowTitle, windowText, control, value],
  );
}
