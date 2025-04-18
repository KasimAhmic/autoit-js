import { INT, LPCWSTR } from './@types';
import { autoit } from './lib/autoit';
import { ShowWindowFlag } from './run';

/**
 * Runs a program and waits for it to close before continuing.
 *
 * @param program The name of the program to run.
 * @param directory Optional working directory for the program.
 * @param showFlag Optional flag to control how the program's window is shown.
 *
 * @returns The exit code of the program.
 *
 * @example
 * ```typescript
 * import { RunWait } from '@ahmic/autoit-js';
 *
 * const exitCode = RunWait('notepad.exe');
 *
 * console.log(exitCode); // Output: 0
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/RunWait.htm
 */
export function RunWait(
  program: string,
  directory: string = '',
  showFlag: number = ShowWindowFlag.SHOWNORMAL,
): number {
  return autoit.invoke('AU3_RunWait', INT, [LPCWSTR, LPCWSTR, INT], [program, directory, showFlag]);
}
