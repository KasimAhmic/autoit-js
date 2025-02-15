import { INT, LPCWSTR } from './@types/win32';
import { autoit } from './autoit/autoit';

export function ControlHide(windowTitle: string, windowText: string, control: string): number {
  return autoit.invoke(
    'AU3_ControlHide',
    INT,
    [LPCWSTR, LPCWSTR, LPCWSTR],
    [windowTitle, windowText, control],
  );
}
