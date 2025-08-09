import { HWND, INT } from './@types';
import { autoit } from './lib/autoit';

/**
 * Sets the focus to a control in a window.
 *
 * @param windowHandle The handle of the window to access.
 * @param controlHandle The handle of the control to focus.
 *
 * @returns 1 if success, 0 if failure.
 *
 * @example
 * ```typescript
 * import { ControlFocusByHandleSync, ControlGetHandleSync, WinGetHandleSync } from '@ahmic/autoit-js';
 *
 * const windowHandle = WinGetHandleSync('Untitled - Notepad');
 * const controlHandle = ControlGetHandleSync(windowHandle, 'Edit1');
 *
 * ControlFocusByHandleSync(windowHandle, controlHandle);
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/ControlFocus.htm
 */
export function ControlFocusByHandleSync(windowHandle: bigint, controlHandle: bigint): number {
  return autoit.invoke('AU3_ControlFocusByHandle', INT, [HWND, HWND], [windowHandle, controlHandle]);
}

/**
 * Sets the focus to a control in a window.
 *
 * @param windowHandle The handle of the window to access.
 * @param controlHandle The handle of the control to focus.
 *
 * @returns A promise that resolves to 1 if success, or 0 if failure.
 *
 * @example
 * ```typescript
 * import { ControlFocusByHandle, ControlGetHandle, WinGetHandle } from '@ahmic/autoit-js';
 *
 * const windowHandle = await WinGetHandle('Untitled - Notepad');
 * const controlHandle = await ControlGetHandle(windowHandle, 'Edit1');
 *
 * await ControlFocusByHandle(windowHandle, controlHandle);
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/ControlFocus.htm
 */
export function ControlFocusByHandle(windowHandle: bigint, controlHandle: bigint): Promise<number> {
  return autoit.invokeAsync('AU3_ControlFocusByHandle', INT, [HWND, HWND], [windowHandle, controlHandle]);
}
