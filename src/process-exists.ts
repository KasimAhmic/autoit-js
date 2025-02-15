import { INT, LPCWSTR } from './@types';
import { autoit } from './autoit/autoit';

export function ProcessExists(process: string): boolean {
  return autoit.invoke('AU3_ProcessExists', INT, [LPCWSTR], [process]) !== 0;
}
