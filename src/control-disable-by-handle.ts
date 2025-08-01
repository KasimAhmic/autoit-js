import { HWND, INT } from './@types';
import { autoit } from './lib/autoit';

/**
 * Disables a control in a window.
 *
 * @param windowHandle The handle of the window to access.
 * @param controlHandle The handle of the control to disable.
 *
 * @returns 1 if success, 0 if failure.
 *
 * @example
 * ```typescript
 * import { ControlDisableByHandleSync, ControlGetHandleSync, WinGetHandleSync } from '@ahmic/autoit-js';
 *
 * const windowHandle = WinGetHandleSync('Untitled - Notepad');
 * const controlHandle = ControlGetHandleSync(windowHandle, 'Edit1');
 *
 * ControlDisableByHandleSync(windowHandle, controlHandle);
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/ControlDisable.htm
 */
export function ControlDisableByHandleSync(windowHandle: bigint, controlHandle: bigint): number {
  return autoit.invoke('AU3_ControlDisableByHandle', INT, [HWND, HWND], [windowHandle, controlHandle]);
}

/**
 * Disables a control in a window.
 *
 * @param windowHandle The handle of the window to access.
 * @param controlHandle The handle of the control to disable.
 *
 * @returns A promise that resolves to 1 if success, or 0 if failure.
 *
 * @example
 * ```typescript
 * import { ControlDisableByHandle, ControlGetHandle, WinGetHandle } from '@ahmic/autoit-js';
 *
 * const windowHandle = await WinGetHandle('Untitled - Notepad');
 * const controlHandle = await ControlGetHandle(windowHandle, 'Edit1');
 *
 * await ControlDisableByHandle(windowHandle, controlHandle);
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/ControlDisable.htm
 */
export function ControlDisableByHandle(windowHandle: bigint, controlHandle: bigint): Promise<number> {
  return autoit.invokeAsync('AU3_ControlDisableByHandle', INT, [HWND, HWND], [windowHandle, controlHandle]);
}
