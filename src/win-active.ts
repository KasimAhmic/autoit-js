import { INT, LPCWSTR } from './@types';
import { autoit } from './lib/autoit';

/**
 * Checks if a window is currently active.
 *
 * @param windowTitle The title of the window to check.
 * @param windowText Optional text found in the window.
 *
 * @returns 1 if the window is active, 0 otherwise.
 *
 * @example
 * ```typescript
 * import { WinActive } from '@ahmic/autoit-js';
 *
 * const isActive = WinActive('Untitled - Notepad');
 *
 * console.log(isActive); // Output: 1
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinActive.htm
 */
export function WinActive(windowTitle: string, windowText: string = ''): number {
  return autoit.invoke('AU3_WinActive', INT, [LPCWSTR, LPCWSTR], [windowTitle, windowText]);
}
