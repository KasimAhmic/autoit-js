import { HWND, INT } from './@types';
import { autoit } from './lib/autoit';

/**
 * Disables a control in a window. Searches for the window and control by the handle of each.
 *
 * @param windowHandle The handle of the window to access.
 * @param controlHandle The handle of the control to disable.
 *
 * @returns 1 if success, 0 if failure.
 *
 * @example
 * ```typescript
 * import { ControlDisableByHandle, ControlGetHandle, WinGetHandle } from '@ahmic/autoit-js';
 *
 * const windowHandle = WinGetHandle('Untitled - Notepad');
 * const controlHandle = ControlGetHandle(windowHandle, 'Edit1');
 *
 * ControlDisableByHandle(windowHandle, controlHandle);
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/ControlDisable.htm
 */
export function ControlDisableByHandle(windowHandle: bigint, controlHandle: bigint): number {
  return autoit.invoke('AU3_ControlDisableByHandle', INT, [HWND, HWND], [windowHandle, controlHandle]);
}
