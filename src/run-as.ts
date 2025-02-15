import { INT, LPCWSTR } from './@types/win32';
import { autoit } from './autoit/autoit';
import { ShowWindowFlag } from './run';

export enum LogonFlag {
  NoProfile = 0,
  Profile = 1,
  Network = 2,
  Inherit = 4,
}

export function RunAs(
  username: string,
  domain: string,
  password: string,
  logonFlag: LogonFlag,
  program: string,
  directory: string = '',
  showFlag: number = ShowWindowFlag.SHOWNORMAL,
): number {
  return autoit.invoke(
    'AU3_RunAs',
    INT,
    [LPCWSTR, LPCWSTR, LPCWSTR, INT, LPCWSTR, LPCWSTR, INT],
    [username, domain, password, logonFlag, program, directory, showFlag],
  );
}
