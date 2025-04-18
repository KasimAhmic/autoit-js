import { HWND, INT } from './@types';
import { autoit } from './lib/autoit';

/**
 * Checks if a window is currently active.
 *
 * @param windowHandle The handle of the window to check.
 *
 * @returns 1 if the window is active, 0 otherwise.
 *
 * @example
 * ```typescript
 * import { WinActiveByHandle, WinGetHandle } from '@ahmic/autoit-js';
 *
 * const windowHandle = WinGetHandle('Untitled - Notepad');
 * const isActive = WinActiveByHandle(windowHandle);
 *
 * console.log(isActive); // Output: 1
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinActive.htm
 */
export function WinActiveByHandle(windowHandle: bigint): number {
  return autoit.invoke('AU3_WinActiveByHandle', INT, [HWND], [windowHandle]);
}
