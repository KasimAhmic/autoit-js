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
 * import { ControlDisableByHandle, ControlEnableByHandle, ControlGetHandle, WinGetHandle } from '@ahmic/autoit-js';
 *
 * const windowHandle = WinGetHandle('Untitled - Notepad');
 * const controlHandle = ControlGetHandle(windowHandle, 'Edit1');
 *
 * // Disable the Notepad window's edit control.
 * ControlDisableByHandle(windowHandle, controlHandle);
 *
 * // Enable the Notepad window's edit control.
 * ControlEnableByHandle(windowHandle, controlHandle);
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/ControlEnable.htm
 */
export function ControlEnableByHandle(windowHandle: bigint, controlHandle: bigint): number {
  return autoit.invoke('AU3_ControlEnableByHandle', INT, [HWND, HWND], [windowHandle, controlHandle]);
}
