import { INT, LPCWSTR } from './@types';
import { autoit } from './autoit/autoit';

export enum ShowWindowFlag {
  HIDE = 0,
  SHOWNORMAL = 1,
  SHOWMINIMIZED = 2,
  SHOWMAXIMIZED = 3,
  SHOWNOACTIVATE = 4,
  SHOW = 5,
  MINIMIZE = 6,
  SHOWMINNOACTIVE = 7,
  SHOWNA = 8,
  RESTORE = 9,
  SHOWDEFAULT = 10,
  FORCEMINIMIZE = 11,
}

export function Run(
  program: string,
  directory: string = '',
  showFlag: number = ShowWindowFlag.SHOWNORMAL,
): number {
  return autoit.invoke('AU3_Run', INT, [LPCWSTR, LPCWSTR, INT], [program, directory, showFlag]);
}
