import { INT, LPCWSTR } from './@types';
import { autoit } from './lib/autoit';

export function WinSetTitle(windowTitle: string, windowText: string = '', newTitle: string): number {
  return autoit.invoke(
    'AU3_WinSetTitle',
    INT,
    [LPCWSTR, LPCWSTR, LPCWSTR],
    [windowTitle, windowText, newTitle],
  );
}
