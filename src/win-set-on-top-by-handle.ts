import { HWND, INT } from './@types';
import { autoit } from './lib/autoit';

/**
 * Sets whether a window is on top of all other windows.
 *
 * @param windowHandle The handle of the window to set on top.
 * @param onTop Whether to set the window on top or not.
 *
 * @returns 1 if the operation was successful, 0 otherwise.
 *
 * @example
 * ```typescript
 * import { WinSetOnTopByHandleSync, WinGetHandleSync } from '@ahmic/autoit-js';
 *
 * const windowHandle = WinGetHandleSync('Untitled - Notepad');
 *
 * WinSetOnTopByHandleSync(windowHandle, true);
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinSetOnTop.htm
 */
export function WinSetOnTopByHandleSync(windowHandle: bigint, onTop: boolean): number {
  return autoit.invoke('AU3_WinSetOnTopByHandle', INT, [HWND, INT], [windowHandle, onTop ? 1 : 0]);
}

/**
 * Sets whether a window is on top of all other windows.
 *
 * @param windowHandle The handle of the window to set on top.
 * @param onTop Whether to set the window on top or not.
 *
 * @returns A promise that resolves to 1 if the operation was successful, or 0 otherwise.
 *
 * @example
 * ```typescript
 * import { WinSetOnTopByHandle, WinGetHandle } from '@ahmic/autoit-js';
 *
 * const windowHandle = await WinGetHandle('Untitled - Notepad');
 *
 * await WinSetOnTopByHandle(windowHandle, true);
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinSetOnTop.htm
 */
export function WinSetOnTopByHandle(windowHandle: bigint, onTop: boolean): Promise<number> {
  return autoit.invokeAsync('AU3_WinSetOnTopByHandle', INT, [HWND, INT], [windowHandle, onTop ? 1 : 0]);
}
