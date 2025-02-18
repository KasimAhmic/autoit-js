import { INT, LPCWSTR, VOID } from './@types';
import { autoit } from './autoit/autoit';

export enum SendMode {
  Default = 0,
  Raw = 1,
}

export function Send(value: string, mode: SendMode = SendMode.Default): void {
  return autoit.invoke('AU3_Send', VOID, [LPCWSTR, INT], [value, mode]);
}
