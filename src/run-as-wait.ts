import { INT, LPCWSTR } from './@types';
import { autoit } from './lib/autoit';
import { ShowWindowFlag } from './run';
import { LogonFlag } from './run-as';

/**
 * Runs a program under a different user account and waits for it to close before continuing.
 *
 * @param username The username to run the program as.
 * @param domain The domain of the user account.
 * @param password The password of the user account.
 * @param logonFlag The logon flag to control the behavior of the logon.
 * @param program The name of the program to run.
 * @param directory Optional working directory for the program.
 * @param showFlag Optional flag to control how the program's window is shown.
 *
 * @returns The exit code of the program.
 *
 * @example
 * ```typescript
 * import { RunAsWait, LogonFlag } from '@ahmic/autoit-js';
 *
 * const exitCode = RunAsWait('admin', 'DOMAIN', 'password', LogonFlag.Profile, 'notepad.exe');
 *
 * console.log(exitCode); // Output: 0
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/RunAsWait.htm
 */
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
