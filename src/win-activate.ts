import { INT, LPCWSTR } from './@types';
import { autoit } from './lib/autoit';

export function WinActivate(windowTitle: string, windowText: string = ''): number {
  return autoit.invoke('AU3_WinActivate', INT, [LPCWSTR, LPCWSTR], [windowTitle, windowText]);
}
