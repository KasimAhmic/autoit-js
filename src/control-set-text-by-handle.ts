import { HWND, INT, LPCWSTR } from './@types';
import { autoit } from './lib/autoit';

/**
 * Sets the text of a control in a window. Searches for the control by its handle.
 *
 * @param windowHandle The handle of the window to access.
 * @param controlHandle The handle of the control to set text for.
 * @param value The text to set for the control.
 *
 * @returns 1 if successful, 0 otherwise.
 *
 * @example
 * ```typescript
 * import { ControlSetTextByHandle, ControlGetHandle } from '@ahmic/autoit-js';
 *
 * const controlHandle = ControlGetHandle(windowHandle, 'Edit1');
 * ControlSetTextByHandle(windowHandle, controlHandle, 'Hello, World!');
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/ControlSetText.htm
 */
export function ControlSetTextByHandle(windowHandle: bigint, controlHandle: bigint, value: string): number {
  return autoit.invoke(
    'AU3_ControlSetTextByHandle',
    INT,
    [HWND, HWND, LPCWSTR],
    [windowHandle, controlHandle, value],
  );
}
