import { HWND, INT } from './@types';
import { autoit } from './lib/autoit';

/**
 * Enables a control in a window.
 *
 * @param windowHandle The handle of the window to access.
 * @param controlHandle The handle of the control to enable.
 *
 * @returns 1 if success, 0 if failure.
 *
 * @example
 * ```typescript
 * import {
 *   ControlDisableByHandleSync,
 *   ControlEnableByHandleSync,
 *   ControlGetHandleSync,
 *   WinGetHandleSync,
 * } from '@ahmic/autoit-js';
 *
 * const windowHandle = WinGetHandleSync('Untitled - Notepad');
 * const controlHandle = ControlGetHandleSync(windowHandle, 'Edit1');
 *
 * // Disable the Notepad window's edit control.
 * ControlDisableByHandleSync(windowHandle, controlHandle);
 *
 * // Enable the Notepad window's edit control.
 * ControlEnableByHandleSync(windowHandle, controlHandle);
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/ControlEnable.htm
 */
export function ControlEnableByHandleSync(windowHandle: bigint, controlHandle: bigint): number {
  return autoit.invoke('AU3_ControlEnableByHandle', INT, [HWND, HWND], [windowHandle, controlHandle]);
}

/**
 * Enables a control in a window.
 *
 * @param windowHandle The handle of the window to access.
 * @param controlHandle The handle of the control to enable.
 *
 * @returns A promise that resolves to 1 if success, or 0 if failure.
 *
 * @example
 * ```typescript
 * import {
 *   ControlDisableByHandle,
 *   ControlEnableByHandle,
 *   ControlGetHandle,
 *   WinGetHandle,
 * } from '@ahmic/autoit-js';
 *
 * const windowHandle = await WinGetHandle('Untitled - Notepad');
 * const controlHandle = await ControlGetHandle(windowHandle, 'Edit1');
 *
 * // Disable the Notepad window's edit control.
 * await ControlDisableByHandle(windowHandle, controlHandle);
 *
 * // Enable the Notepad window's edit control.
 * await ControlEnableByHandle(windowHandle, controlHandle);
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/ControlEnable.htm
 */
export function ControlEnableByHandle(windowHandle: bigint, controlHandle: bigint): number {
  return autoit.invoke('AU3_ControlEnableByHandle', INT, [HWND, HWND], [windowHandle, controlHandle]);
}
