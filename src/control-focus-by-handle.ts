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
 * import { ControlFocusByHandle, ControlGetHandle, WinGetHandle } from '@ahmic/autoit-js';
 *
 * const windowHandle = WinGetHandle('Untitled - Notepad');
 * const controlHandle = ControlGetHandle(windowHandle, 'Edit1');
 *
 * ControlFocusByHandle(windowHandle, controlHandle);
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/ControlFocus.htm
 */
export function ControlFocusByHandle(windowHandle: bigint, controlHandle: bigint): number {
  return autoit.invoke('AU3_ControlFocusByHandle', INT, [HWND, HWND], [windowHandle, controlHandle]);
}
