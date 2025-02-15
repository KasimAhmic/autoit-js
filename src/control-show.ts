import { INT, LPCWSTR } from './@types/win32';
import { autoit } from './autoit/autoit';

export function ControlShow(title: string, text: string, control: string): number {
  return autoit.invoke('AU3_ControlShow', INT, [LPCWSTR, LPCWSTR, LPCWSTR], [title, text, control]);
}
