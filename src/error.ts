import { INT } from './@types';
import { autoit } from './autoit/autoit';

export function error(): number {
  return autoit.invoke('AU3_error', INT, [], []);
}
