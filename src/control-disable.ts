import { INT, LPCWSTR } from './@types/win32';
import { autoit } from './autoit/autoit';

export function ControlDisable(title: string, text: string, control: string): number {
  return autoit.invoke('AU3_ControlDisable', INT, [LPCWSTR, LPCWSTR, LPCWSTR], [title, text, control]);
}
