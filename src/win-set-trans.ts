import { INT, LPCWSTR } from './@types';
import { autoit } from './lib/autoit';

export function WinSetTrans(windowTitle: string, windowText: string = '', transparency: number): number {
  return autoit.invoke(
    'AU3_WinSetTrans',
    INT,
    [LPCWSTR, LPCWSTR, INT],
    [windowTitle, windowText, transparency],
  );
}
