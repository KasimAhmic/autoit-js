import { INT } from './@types';
import { autoit } from './lib/autoit';

export function IsAdmin(): boolean {
  return autoit.invoke('AU3_IsAdmin', INT, [], []) === 1;
}
