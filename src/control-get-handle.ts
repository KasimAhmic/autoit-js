import { INT, LPCWSTR } from './@types/win32';
import { autoit } from './autoit/autoit';

export function ControlGetHandle(windowHandle: number, controlName: string): number {
  return autoit.invoke('AU3_ControlGetHandle', INT, [INT, LPCWSTR], [windowHandle, controlName]);
}
