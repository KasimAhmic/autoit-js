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
 * import { WinExistsByHandleSync, WinGetHandleSync } from '@ahmic/autoit-js';
 *
 * const handle = WinGetHandleSync('Untitled - Notepad');
 * const exists = WinExistsByHandleSync(handle);
 *
 * console.log(exists); // Output: true or false
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinExists.htm
 */
export function WinExistsByHandleSync(windowHandle: bigint): boolean {
  return autoit.invoke('AU3_WinExistsByHandle', INT, [HWND], [windowHandle]) === 1;
}

/**
 * Checks if a window exists.
 *
 * @param windowHandle The handle of the window to search for.
 *
 * @returns A promise that resolves to true if the window exists, or false otherwise.
 *
 * @example
 * ```typescript
 * import { WinExistsByHandle, WinGetHandle } from '@ahmic/autoit-js';
 *
 * const handle = await WinGetHandle('Untitled - Notepad');
 * const exists = await WinExistsByHandle(handle);
 *
 * console.log(exists); // Output: true or false
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinExists.htm
 */
export async function WinExistsByHandle(windowHandle: bigint): Promise<boolean> {
  const result = await autoit.invokeAsync('AU3_WinExistsByHandle', INT, [HWND], [windowHandle]);

  return result === 1;
}
