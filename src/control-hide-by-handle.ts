import { HWND, INT } from './@types';
import { autoit } from './lib/autoit';

/**
 * Hides a control in a window.
 *
 * @param windowHandle The handle of the window to access.
 * @param controlHandle The handle of the control to hide.
 *
 * @returns 1 if success, 0 if failure.
 *
 * @example
 * ```typescript
 * import { ControlHideByHandleSync, ControlGetHandleSync, WinGetHandleSync } from '@ahmic/autoit-js';
 *
 * const windowHandle = WinGetHandleSync('Untitled - Notepad');
 * const controlHandle = ControlGetHandleSync(windowHandle, 'Edit1');
 *
 * ControlHideByHandleSync(windowHandle, controlHandle);
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/ControlHide.htm
 */
export function ControlHideByHandleSync(windowHandle: bigint, controlHandle: bigint): number {
  return autoit.invoke('AU3_ControlHideByHandle', INT, [HWND, HWND], [windowHandle, controlHandle]);
}

/**
 * Hides a control in a window.
 *
 * @param windowHandle The handle of the window to access.
 * @param controlHandle The handle of the control to hide.
 *
 * @returns A promise that resolves to 1 if success, 0 if failure.
 *
 * @example
 * ```typescript
 * import { ControlHideByHandle, ControlGetHandle, WinGetHandle } from '@ahmic/autoit-js';
 *
 * const windowHandle = await WinGetHandle('Untitled - Notepad');
 * const controlHandle = await ControlGetHandle(windowHandle, 'Edit1');
 *
 * await ControlHideByHandle(windowHandle, controlHandle);
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/ControlHide.htm
 */
export function ControlHideByHandle(windowHandle: bigint, controlHandle: bigint): Promise<number> {
  return autoit.invokeAsync('AU3_ControlHideByHandle', INT, [HWND, HWND], [windowHandle, controlHandle]);
}
