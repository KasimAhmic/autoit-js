import { VOID } from './@types/win32';
import { autoit } from './autoit/autoit';

export function Init(): void {
  return autoit.invoke('AU3_Init', VOID, [], []);
}
