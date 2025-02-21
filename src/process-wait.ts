import { INT, LPCWSTR } from './@types';
import { autoit } from './lib/autoit';

export function ProcessWait(process: string, timeout: number = 0): number {
  return autoit.invoke('AU3_ProcessWait', INT, [LPCWSTR, INT], [process, timeout]);
}
