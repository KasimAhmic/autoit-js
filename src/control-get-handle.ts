import koffi from 'koffi';

import { HWND, LPCWSTR } from './@types';
import { autoit } from './lib/autoit';

/**
 * Gets the handle of a control in a window. Searches for the control by the handle of its window, and the ID
 * of the control.
 *
 * @param windowHandle The handle of the window to access.
 * @param controlId The control to get the handle of.
 *
 * @returns The handle of the control.
 *
 * @example
 * ```typescript
 * import { ControlGetHandle, WinGetHandle } from '@ahmic/autoit-js';
 *
 * const windowHandle = WinGetHandle('Untitled - Notepad');
 * const controlHandle = ControlGetHandle(windowHandle, 'Edit1');
 *
 * console.log(controlHandle); // Output: 0x0000000000000001
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/ControlGetHandle.htm
 */
export function ControlGetHandle(windowHandle: bigint, controlId: string): bigint {
  const handleRef = autoit.invoke('AU3_ControlGetHandle', HWND, [HWND, LPCWSTR], [windowHandle, controlId]);

  return koffi.address(handleRef);
}
