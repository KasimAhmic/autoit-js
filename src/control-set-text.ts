import { INT, LPCWSTR } from './@types/win32';
import { autoit } from './autoit/autoit';

export function ControlSetText(title: string, text: string, control: string, value: string): number {
  return autoit.invoke(
    'AU3_ControlSetText',
    INT,
    [LPCWSTR, LPCWSTR, LPCWSTR, LPCWSTR],
    [title, text, control, value],
  );
}
