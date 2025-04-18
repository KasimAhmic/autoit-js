import { INT, LPCWSTR } from './@types';
import { autoit } from './lib/autoit';

/**
 * Checks if a window exists.
 *
 * @param windowTitle The title of the window to search for.
 * @param windowText Optional text found in the window.
 *
 * @returns True if the window exists, false otherwise.
 *
 * @example
 * ```typescript
 * import { WinExists } from '@ahmic/autoit-js';
 *
 * const exists = WinExists('Untitled - Notepad');
 * console.log(exists); // Output: true or false
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinExists.htm
 */
export function WinExists(windowTitle: string, windowText: string = ''): boolean {
  return autoit.invoke('AU3_WinExists', INT, [LPCWSTR, LPCWSTR], [windowTitle, windowText]) === 1;
}
