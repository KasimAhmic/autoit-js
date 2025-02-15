import { INT, LPCWSTR } from './@types/win32';
import { autoit } from './autoit/autoit';

export function ControlDisable(szTitle: string, szText: string, szControl: string): number {
  return autoit.invoke('AU3_ControlDisable', INT, [LPCWSTR, LPCWSTR, LPCWSTR], [szTitle, szText, szControl]);
}
