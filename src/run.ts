import { INT, LPCWSTR } from './@types';
import { autoit } from './lib/autoit';

/**
 * Enumeration for flags that control how the program window is shown.
 *
 * @see https://learn.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-showwindow
 */
export enum ShowWindowFlag {
  /**
   * Hides the window and activates another window.
   * */
  HIDE = 0,

  /**
   * Activates and displays a window. If the window is minimized or maximized, the system restores it to its
   * original size and position. An application should specify this flag when displaying the window for the
   * first time.
   */
  SHOWNORMAL = 1,

  /**
   * Activates the window and displays it as a minimized window.
   */
  SHOWMINIMIZED = 2,

  /**
   * Activates the window and displays it as a maximized window.
   */
  SHOWMAXIMIZED = 3,

  /**
   * Displays a window in its most recent size and position. This value is similar to
   * {@linkcode ShowWindowFlag.SHOWNORMAL}, except the window is not activated.
   */
  SHOWNOACTIVATE = 4,

  /**
   * Activates the window and displays it in its current size and position.
   */
  SHOW = 5,

  /**
   * Minimizes the specified window and activates the next top-level window in the Z order.
   * */
  MINIMIZE = 6,

  /**
   * Displays the window as a minimized window. This value is similar to
   * {@linkcode ShowWindowFlag.SHOWMINIMIZED}, except the window is not activated.
   */
  SHOWMINNOACTIVE = 7,

  /**
   * Displays the window in its current size and position. This value is similar to
   * {@linkcode ShowWindowFlag.SHOW}, except the window is not activated.
   */
  SHOWNA = 8,

  /**
   * Activates and displays the window. If the window is minimized or maximized, the system restores it to its
   * original size and position. An application should specify this flag when restoring a minimized window.
   */
  RESTORE = 9,

  /**
   * Sets the show state based on the `SW_` value specified by the program that started the application.
   */
  SHOWDEFAULT = 10,
}

/**
 * Runs an external program.
 *
 * @param program The path to the program to run.
 * @param workingDir Optional working directory for the program.
 * @param showFlag Optional flag to control how the program window is shown. See {@linkcode ShowWindowFlag} for details.
 *
 * @returns The PID of the process if successful, or 0 if failed.
 *
 * @example
 * ```typescript
 * import { Run } from '@ahmic/autoit-js';
 *
 * const pid = Run('notepad.exe');
 *
 * console.log(pid); // Output: 1234
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/Run.htm
 */
export function Run(
  program: string,
  workingDir: string = '',
  showFlag: number = ShowWindowFlag.SHOWNORMAL,
): number {
  return autoit.invoke('AU3_Run', INT, [LPCWSTR, LPCWSTR, INT], [program, workingDir, showFlag]);
}
