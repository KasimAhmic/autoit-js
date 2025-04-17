import { HWND, INT, LPWSTR, VOID } from './@types';
import { autoit } from './lib/autoit';
import { createUnicodeBuffer, unicodeBufferToString } from './util';

/**
 * Gets the ID of the control that has keyboard focus in a window.
 *
 * @param windowHandle The handle of the window to access.
 *
 * @returns The ID of the control that has keyboard focus.
 *
 * @example
 * ```typescript
 * import { ControlGetFocusByHandle, WinGetHandle } from '@ahmic/autoit-js';
 *
 * const windowHandle = WinGetHandle('Untitled - Notepad');
 *
 * const id = ControlGetFocusByHandle(windowHandle);
 *
 * console.log(id); // Output: "Edit1"
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/ControlGetFocus.htm
 */
export function ControlGetFocusByHandle(windowHandle: bigint): string {
  const [buffer, length] = createUnicodeBuffer(1024);

  autoit.invoke('AU3_ControlGetFocusByHandle', VOID, [HWND, LPWSTR, INT], [windowHandle, buffer, length]);

  return unicodeBufferToString(buffer);
}
