import { INT, LPCWSTR } from './@types/win32';
import { autoit } from './autoit/autoit';

export function ControlSetText(
  windowTitle: string,
  windowText: string,
  controlId: string,
  value: string,
): number {
  return autoit.invoke(
    'AU3_ControlSetText',
    INT,
    [LPCWSTR, LPCWSTR, LPCWSTR, LPCWSTR],
    [windowTitle, windowText, controlId, value],
  );
}
