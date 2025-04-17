import { HWND, INT } from './@types';
import { autoit } from './lib/autoit';

/**
 * Checks if a window exists.
 *
 * @param windowHandle The handle of the window to search for.
 *
 * @returns True if the window exists, false otherwise.
 *
 * @example
 * ```typescript
 * import { WinExistsByHandle, WinGetHandle } from '@ahmic/autoit-js';
 *
 * const handle = WinGetHandle('Untitled - Notepad');
 * const exists = WinExistsByHandle(handle);
 *
 * console.log(exists); // Output: true or false
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinExists.htm
 */
export function WinExistsByHandle(windowHandle: bigint): boolean {
  return autoit.invoke('AU3_WinExistsByHandle', INT, [HWND], [windowHandle]) === 1;
}
