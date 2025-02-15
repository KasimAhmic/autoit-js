import { INT, LPCWSTR } from './@types/win32';
import { autoit } from './autoit/autoit';

export function WinSetTrans(title: string, text: string = '', transparency: number): number {
  return autoit.invoke('AU3_WinSetTrans', INT, [LPCWSTR, LPCWSTR, INT], [title, text, transparency]);
}
