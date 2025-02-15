import { INT, LPCWSTR } from './@types';
import { autoit } from './autoit/autoit';

export function ProcessClose(process: string): number {
  return autoit.invoke('AU3_ProcessClose', INT, [LPCWSTR], [process]);
}
