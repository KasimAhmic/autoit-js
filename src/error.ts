import { INT } from './@types/win32';
import { autoit } from './autoit/autoit';

export function error(): number {
  return autoit.invoke('AU3_error', INT, [], []);
}
