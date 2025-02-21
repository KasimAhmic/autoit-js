import { INT } from './@types';
import { autoit } from './lib/autoit';

export function error(): number {
  return autoit.invoke('AU3_error', INT, [], []);
}
