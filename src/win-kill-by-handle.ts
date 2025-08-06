import { HWND, INT } from './@types';
import { autoit } from './lib/autoit';

/**
 * Forces a window to close.
 *
 * @param windowHandle The handle of the window to close.
 *
 * @returns 1 if successful, 0 otherwise.
 *
 * @example
 * ```typescript
 * import { WinKillByHandleSync, WinGetHandleSync } from '@ahmic/autoit-js';
 *
 * const handle = WinGetHandleSync('Untitled - Notepad');
 * WinKillByHandleSync(handle);
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinKill.htm
 */
export function WinKillByHandleSync(windowHandle: bigint): number {
  return autoit.invoke('AU3_WinKillByHandle', INT, [HWND], [windowHandle]);
}

/**
 * Forces a window to close.
 *
 * @param windowHandle The handle of the window to close.
 *
 * @returns A promise that resolves to 1 if successful, or 0 otherwise.
 *
 * @example
 * ```typescript
 * import { WinKillByHandle, WinGetHandle } from '@ahmic/autoit-js';
 *
 * const handle = WinGetHandle('Untitled - Notepad');
 * WinKillByHandle(handle);
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinKill.htm
 */
export function WinKillByHandle(windowHandle: bigint): Promise<number> {
  return autoit.invokeAsync('AU3_WinKillByHandle', INT, [HWND], [windowHandle]);
}
