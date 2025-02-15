import { INT, LPCWSTR } from './@types';
import { autoit } from './autoit/autoit';

export function WinWaitNotActive(windowTitle: string, windowText: string = '', timeout: number = 0): number {
  return autoit.invoke(
    'AU3_WinWaitNotActive',
    INT,
    [LPCWSTR, LPCWSTR, INT],
    [windowTitle, windowText, timeout],
  );
}
