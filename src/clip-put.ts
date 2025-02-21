import { LPCWSTR, VOID } from './@types';
import { autoit } from './lib/autoit';

export function ClipPut(value: string): void {
  return autoit.invoke('AU3_ClipPut', VOID, [LPCWSTR], [value]);
}
