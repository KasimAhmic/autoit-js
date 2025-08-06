import { HWND, INT } from './@types';
import { autoit } from './lib/autoit';

/**
 * Activates a window.
 *
 * @param windowHandle The handle of the window to activate.
 *
 * @returns 1 if successful, 0 otherwise.
 *
 * @example
 * ```typescript
 * import { WinActivateByHandleSync, WinGetHandleSync } from '@ahmic/autoit-js';
 *
 * const handle = WinGetHandleSync('Untitled - Notepad');
 * WinActivateByHandleSync(handle);
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinActivate.htm
 */
export function WinActivateByHandleSync(windowHandle: bigint): number {
  return autoit.invoke('AU3_WinActivateByHandle', INT, [HWND], [windowHandle]);
}

/**
 * Activates a window.
 *
 * @param windowHandle The handle of the window to activate.
 *
 * @returns A promise that resolves to 1 if successful, or 0 otherwise.
 *
 * @example
 * ```typescript
 * import { WinActivateByHandle, WinGetHandle } from '@ahmic/autoit-js';
 *
 * const handle = await WinGetHandle('Untitled - Notepad');
 * await WinActivateByHandle(handle);
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinActivate.htm
 */
export function WinActivateByHandle(windowHandle: bigint): Promise<number> {
  return autoit.invokeAsync('AU3_WinActivateByHandle', INT, [HWND], [windowHandle]);
}
