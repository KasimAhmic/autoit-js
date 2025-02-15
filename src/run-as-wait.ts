import { INT, LPCWSTR } from './@types';
import { autoit } from './autoit/autoit';
import { ShowWindowFlag } from './run';
import { LogonFlag } from './run-as';

export function RunAsWait(
  username: string,
  domain: string,
  password: string,
  logonFlag: LogonFlag,
  program: string,
  directory: string = '',
  showFlag: number = ShowWindowFlag.SHOWNORMAL,
): number {
  return autoit.invoke(
    'AU3_RunAsWait',
    INT,
    [LPCWSTR, LPCWSTR, LPCWSTR, INT, LPCWSTR, LPCWSTR, INT],
    [username, domain, password, logonFlag, program, directory, showFlag],
  );
}
