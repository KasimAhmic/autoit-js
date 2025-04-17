import { HWND, INT, LPWSTR, VOID } from './@types';
import { autoit } from './lib/autoit';
import { createUnicodeBuffer, unicodeBufferToString } from './util';

/**
 * Retrieves the text from a control in a window.
 *
 * @param windowHandle The handle of the window to access.
 * @param controlHandle The handle of the control to retrieve text from.
 * @param characterCount The maximum number of characters to retrieve. Default is 1024.
 *
 * @returns The text of the control.
 *
 * @example
 * ```typescript
 * import { ControlGetTextByHandle, ControlGetHandle, WinGetHandle } from '@ahmic/autoit-js';
 *
 * const windowHandle = WinGetHandle('Untitled - Notepad');
 * const controlHandle = ControlGetHandle(windowHandle, 'Edit1');
 *
 * const text = ControlGetTextByHandle(windowHandle, controlHandle);
 *
 * console.log(text); // Output: "Sample text"
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/ControlGetText.htm
 */
export function ControlGetTextByHandle(
  windowHandle: bigint,
  controlHandle: bigint,
  characterCount: number = 1024,
): string {
  const [buffer, length] = createUnicodeBuffer(characterCount);

  autoit.invoke(
    'AU3_ControlGetTextByHandle',
    VOID,
    [HWND, HWND, LPWSTR, INT],
    [windowHandle, controlHandle, buffer, length],
  );

  return unicodeBufferToString(buffer);
}
