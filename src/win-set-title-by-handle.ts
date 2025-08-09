import { HWND, INT, LPCWSTR } from './@types';
import { autoit } from './lib/autoit';

/**
 * Changes the title of a window.
 *
 * @param windowHandle The handle of the window to modify.
 * @param newTitle The new title to set for the window.
 *
 * @returns 1 if successful, 0 otherwise.
 *
 * @example
 * ```typescript
 * import { WinSetTitleByHandleSync, WinGetHandleSync } from '@ahmic/autoit-js';
 *
 * const windowHandle = WinGetHandleSync('Untitled - Notepad');
 *
 * WinSetTitleByHandleSync(windowHandle, 'New Title');
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinSetTitle.htm
 */
export function WinSetTitleByHandleSync(windowHandle: bigint, newTitle: string): number {
  return autoit.invoke('AU3_WinSetTitleByHandle', INT, [HWND, LPCWSTR], [windowHandle, newTitle]);
}

/**
 * Changes the title of a window.
 *
 * @param windowHandle The handle of the window to modify.
 * @param newTitle The new title to set for the window.
 *
 * @returns A promise that resolves to 1 if successful, or 0 otherwise.
 *
 * @example
 * ```typescript
 * import { WinSetTitleByHandle, WinGetHandle } from '@ahmic/autoit-js';
 *
 * const windowHandle = await WinGetHandle('Untitled - Notepad');
 *
 * await WinSetTitleByHandle(windowHandle, 'New Title');
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinSetTitle.htm
 */
export function WinSetTitleByHandle(windowHandle: bigint, newTitle: string): Promise<number> {
  return autoit.invokeAsync('AU3_WinSetTitleByHandle', INT, [HWND, LPCWSTR], [windowHandle, newTitle]);
}
