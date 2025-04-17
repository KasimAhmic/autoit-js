import { INT, LPCWSTR, LPWSTR, VOID } from './@types';
import { autoit } from './lib/autoit';
import { createUnicodeBuffer, unicodeBufferToString } from './util';
import { HWND_HEX_SIZE } from './util/constants';

/**
 * Gets the handle of a control in a window as a hexadecimal string. Searches for the control by the title of
 * its window, the text found in the window, and the ID of the control.
 *
 * @param windowTitle The title of the window to access.
 * @param windowText Optional text found in the window.
 * @param controlId The control to get the handle for.
 *
 * @returns The handle of the control as a hexadecimal string.
 *
 * @example
 * ```typescript
 * import { ControlGetHandleAsText } from '@ahmic/autoit-js';
 *
 * const handle = ControlGetHandleAsText('Untitled - Notepad', '', 'Edit1');
 *
 * console.log(handle); // Output: "0x0000000000000001"
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/ControlGetHandle.htm
 */
export function ControlGetHandleAsText(
  windowTitle: string,
  windowText: string = '',
  controlId: string,
): string {
  const [buffer, length] = createUnicodeBuffer(HWND_HEX_SIZE);

  autoit.invoke(
    'AU3_ControlGetHandleAsText',
    VOID,
    [LPCWSTR, LPCWSTR, LPCWSTR, LPWSTR, INT],
    [windowTitle, windowText, controlId, buffer, length],
  );

  return unicodeBufferToString(buffer);
}
