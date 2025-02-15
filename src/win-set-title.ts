import { INT, LPCWSTR } from './@types/win32';
import { autoit } from './autoit/autoit';

export function WinSetTitle(windowTitle: string, windowText: string = '', newTitle: string): number {
  return autoit.invoke(
    'AU3_WinSetTitle',
    INT,
    [LPCWSTR, LPCWSTR, LPCWSTR],
    [windowTitle, windowText, newTitle],
  );
}
