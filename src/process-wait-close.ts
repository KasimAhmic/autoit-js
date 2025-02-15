import { INT, LPCWSTR } from './@types/win32';
import { autoit } from './autoit/autoit';

export function ProcessWaitClose(process: string, timeout: number = 0): number {
  return autoit.invoke('AU3_ProcessWaitClose', INT, [LPCWSTR, INT], [process, timeout]);
}
