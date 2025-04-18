import { INT, LPCWSTR } from './@types';
import { autoit } from './lib/autoit';

/**
 * Enumeration for window states.
 */
export enum StateFlag {
  /**
   * Hides the window.
   */
  Hide = 0,

  /**
   * Shows the window.
   */
  Show = 5,

  /**
   * Minimizes the window.
   */
  Minimize = 6,

  /**
   * Maximizes the window.
   */
  Maximize = 3,

  /**
   * Restores the window to its original size and position.
   */
  Restore = 9,
  // Disable = ?, TODO: Find out what this value is
  // Enable = ?, TODO: Find out what this value is
}

/**
 * Changes the state of a window.
 *
 * @param windowTitle The title of the window.
 * @param windowText Optional text found in the window.
 * @param flags The state flags to apply. See {@linkcode StateFlag} for details.
 *
 * @returns 1 if successful, 0 otherwise.
 *
 * @example
 * ```typescript
 * import { WinSetState, StateFlag } from '@ahmic/autoit-js';
 *
 * WinSetState('Untitled - Notepad', '', StateFlag.Minimize);
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinSetState.htm
 */
export function WinSetState(windowTitle: string, windowText: string = '', flags: StateFlag): number {
  return autoit.invoke('AU3_WinSetState', INT, [LPCWSTR, LPCWSTR, INT], [windowTitle, windowText, flags]);
}
