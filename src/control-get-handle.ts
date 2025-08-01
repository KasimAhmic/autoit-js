import koffi from 'koffi';

import { HWND, LPCWSTR } from './@types';
import { autoit } from './lib/autoit';

/**
 * Gets the handle of a control in a window.
 *
 * @param windowHandle The handle of the window to access.
 * @param controlId The control to get the handle of.
 *
 * @returns The handle of the control.
 *
 * @example
 * ```typescript
 * import { ControlGetHandleSync, WinGetHandleSync } from '@ahmic/autoit-js';
 *
 * const windowHandle = WinGetHandleSync('Untitled - Notepad');
 * const controlHandle = ControlGetHandleSync(windowHandle, 'Edit1');
 *
 * console.log(controlHandle); // Output: 0x0000000000000001
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/ControlGetHandle.htm
 */
export function ControlGetHandleSync(windowHandle: bigint, controlId: string): bigint {
  const handleRef = autoit.invoke('AU3_ControlGetHandle', HWND, [HWND, LPCWSTR], [windowHandle, controlId]);

  return koffi.address(handleRef);
}

/**
 * Gets the handle of a control in a window.
 *
 * @param windowHandle The handle of the window to access.
 * @param controlId The control to get the handle of.
 *
 * @returns A promise that resolves to the handle of the control.
 *
 * @example
 * ```typescript
 * import { ControlGetHandle, WinGetHandle } from '@ahmic/autoit-js';
 *
 * const windowHandle = await WinGetHandle('Untitled - Notepad');
 * const controlHandle = await ControlGetHandle(windowHandle, 'Edit1');
 *
 * console.log(controlHandle); // Output: 0x0000000000000001
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/ControlGetHandle.htm
 */
export async function ControlGetHandle(windowHandle: bigint, controlId: string): Promise<bigint> {
  const handleRef = await autoit.invokeAsync(
    'AU3_ControlGetHandle',
    HWND,
    [HWND, LPCWSTR],
    [windowHandle, controlId],
  );

  return koffi.address(handleRef);
}
