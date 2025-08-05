import { INT, LPCWSTR } from './@types';
import { autoit } from './lib/autoit';
import { ShowWindowFlag } from './run';

/**
 * Enumeration of logon flags for the RunAs function.
 */
export enum LogonFlag {
  /** Interactive logon with no profile. */
  NoProfile = 0,

  /** Interactive logon with profile. */
  Profile = 1,

  /** Network credentials only. */
  Network = 2,

  /** Inherit the calling process's environment instead of the user's environment. */
  Inherit = 4,
}

/**
 * Runs a program under a different user account.
 *
 * @param username The username to run the program as.
 * @param domain The domain of the user account.
 * @param password The password of the user account.
 * @param logonFlag The logon flag to control the behavior of the logon.
 * @param program The name of the program to run.
 * @param directory Optional working directory for the program.
 * @param showFlag Optional flag to control how the program's window is shown.
 *
 * @returns The PID of the started process if successful, or 0 if failed.
 *
 * @example
 * ```typescript
 * import { RunAsSync, LogonFlag } from '@ahmic/autoit-js';
 *
 * const pid = RunAsSync('admin', 'DOMAIN', 'password', LogonFlag.Profile, 'notepad.exe');
 *
 * console.log(pid); // Output: 123
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/RunAs.htm
 */
export function RunAsSync(
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

/**
 * Runs a program under a different user account.
 *
 * @param username The username to run the program as.
 * @param domain The domain of the user account.
 * @param password The password of the user account.
 * @param logonFlag The logon flag to control the behavior of the logon.
 * @param program The name of the program to run.
 * @param directory Optional working directory for the program.
 * @param showFlag Optional flag to control how the program's window is shown.
 *
 * @returns The PID of the started process if successful, or 0 if failed.
 *
 * @example
 * ```typescript
 * import { RunAs, LogonFlag } from '@ahmic/autoit-js';
 *
 * const pid = await RunAs('admin', 'DOMAIN', 'password', LogonFlag.Profile, 'notepad.exe');
 *
 * console.log(pid); // Output: 123
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/RunAs.htm
 */
export function RunAs(
  username: string,
  domain: string,
  password: string,
  logonFlag: LogonFlag,
  program: string,
  directory: string = '',
  showFlag: number = ShowWindowFlag.SHOWNORMAL,
): Promise<number> {
  return autoit.invokeAsync(
    'AU3_RunAs',
    INT,
    [LPCWSTR, LPCWSTR, LPCWSTR, INT, LPCWSTR, LPCWSTR, INT],
    [username, domain, password, logonFlag, program, directory, showFlag],
  );
}
