import { HWND, INT } from './@types';
import { autoit } from './lib/autoit';

/**
 * Shows a control in a window.
 *
 * @param windowHandle The handle of the window to access.
 * @param controlHandle The handle of the control to show.
 *
 * @returns 1 if success, 0 otherwise.
 *
 * @example
 * ```typescript
 * import { ControlShowByHandleSync, ControlGetHandleSync, WinGetHandleSync } from '@ahmic/autoit-js';
 *
 * const windowHandle = WinGetHandleSync('Untitled - Notepad');
 * const controlHandle = ControlGetHandleSync(windowHandle, 'Edit1');
 *
 * ControlShowByHandleSync(windowHandle, controlHandle);
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/ControlShow.htm
 */
export function ControlShowByHandleSync(windowHandle: bigint, controlHandle: bigint): number {
  return autoit.invoke('AU3_ControlShowByHandle', INT, [HWND, HWND], [windowHandle, controlHandle]);
}

/**
 * Shows a control in a window.
 *
 * @param windowHandle The handle of the window to access.
 * @param controlHandle The handle of the control to show.
 *
 * @returns A promise that resolves to 1 if successful, or 0 otherwise.
 *
 * @example
 * ```typescript
 * import { ControlShowByHandle, ControlGetHandle, WinGetHandle } from '@ahmic/autoit-js';
 *
 * const windowHandle = await WinGetHandle('Untitled - Notepad');
 * const controlHandle = await ControlGetHandle(windowHandle, 'Edit1');
 *
 * await ControlShowByHandle(windowHandle, controlHandle);
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/ControlShow.htm
 */
export function ControlShowByHandle(windowHandle: bigint, controlHandle: bigint): Promise<number> {
  return autoit.invokeAsync('AU3_ControlShowByHandle', INT, [HWND, HWND], [windowHandle, controlHandle]);
}
