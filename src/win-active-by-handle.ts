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
 * import { WinActiveByHandleSync, WinGetHandleSync } from '@ahmic/autoit-js';
 *
 * const windowHandle = WinGetHandleSync('Untitled - Notepad');
 * const isActive = WinActiveByHandleSync(windowHandle);
 *
 * console.log(isActive); // Output: 1
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinActive.htm
 */
export function WinActiveByHandleSync(windowHandle: bigint): number {
  return autoit.invoke('AU3_WinActiveByHandle', INT, [HWND], [windowHandle]);
}

/**
 * Checks if a window is currently active.
 *
 * @param windowHandle The handle of the window to check.
 *
 * @returns A promise that resolves to 1 if the window is active, or 0 otherwise.
 *
 * @example
 * ```typescript
 * import { WinActiveByHandle, WinGetHandle } from '@ahmic/autoit-js';
 *
 * const windowHandle = await WinGetHandle('Untitled - Notepad');
 * const isActive = await WinActiveByHandle(windowHandle);
 *
 * console.log(isActive); // Output: 1
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinActive.htm
 */
export function WinActiveByHandle(windowHandle: bigint): Promise<number> {
  return autoit.invokeAsync('AU3_WinActiveByHandle', INT, [HWND], [windowHandle]);
}
