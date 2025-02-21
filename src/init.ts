import { VOID } from './@types';
import { autoit } from './lib/autoit';

export function Init(): void {
  return autoit.invoke('AU3_Init', VOID, [], []);
}
