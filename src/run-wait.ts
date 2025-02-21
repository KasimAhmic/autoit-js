import { INT, LPCWSTR } from './@types';
import { autoit } from './lib/autoit';
import { ShowWindowFlag } from './run';

export function RunWait(
  program: string,
  directory: string = '',
  showFlag: number = ShowWindowFlag.SHOWNORMAL,
): number {
  return autoit.invoke('AU3_RunWait', INT, [LPCWSTR, LPCWSTR, INT], [program, directory, showFlag]);
}
