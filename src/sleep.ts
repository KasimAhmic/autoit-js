import { INT, VOID } from './@types';
import { autoit } from './autoit/autoit';

export function Sleep(milliseconds: number): void {
  return autoit.invoke('AU3_Sleep', VOID, [INT], [milliseconds]);
}
