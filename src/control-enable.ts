import { INT, LPCWSTR } from './@types/win32';
import { autoit } from './autoit/autoit';

export function ControlEnable(szTitle: string, szText: string, szControl: string): number {
  return autoit.invoke('AU3_ControlEnable', INT, [LPCWSTR, LPCWSTR, LPCWSTR], [szTitle, szText, szControl]);
}
