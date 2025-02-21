import { INT, LPCWSTR } from './@types';
import { autoit } from './lib/autoit';

export function WinKill(windowTitle: string, windowText: string = ''): number {
  return autoit.invoke('AU3_WinKill', INT, [LPCWSTR, LPCWSTR], [windowTitle, windowText]);
}
