import { HWND, INT } from './@types';
import { autoit } from './lib/autoit';

/**
 * Closes a window.
 *
 * @param windowHandle The handle of the window to close.
 *
 * @returns 1 if successful, 0 otherwise.
 *
 * @example
 * ```typescript
 * import { WinCloseByHandleSync, WinGetHandleSync } from '@ahmic/autoit-js';
 *
 * const handle = WinGetHandleSync('Untitled - Notepad');
 * WinCloseByHandleSync(handle);
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinClose.htm
 */
export function WinCloseByHandleSync(windowHandle: bigint): number {
  return autoit.invoke('AU3_WinCloseByHandle', INT, [HWND], [windowHandle]);
}

/**
 * Closes a window.
 *
 * @param windowHandle The handle of the window to close.
 *
 * @returns A promise that resolves to 1 if successful, or 0 otherwise.
 *
 * @example
 * ```typescript
 * import { WinCloseByHandle, WinGetHandle } from '@ahmic/autoit-js';
 *
 * const handle = await WinGetHandle('Untitled - Notepad');
 * await WinCloseByHandle(handle);
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinClose.htm
 */
export function WinCloseByHandle(windowHandle: bigint): Promise<number> {
  return autoit.invokeAsync('AU3_WinCloseByHandle', INT, [HWND], [windowHandle]);
}
