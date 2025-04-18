import { INT, LPCWSTR, LPWSTR, VOID } from './@types';
import { autoit } from './lib/autoit';
import { createUnicodeBuffer, unicodeBufferToString } from './util';

/**
 * Retrieves the text from a control in a window.
 *
 * @param windowTitle The title of the window to access.
 * @param windowText Optional text found in the window.
 * @param controlId The ID of the control to retrieve text from.
 * @param characterCount The maximum number of characters to retrieve. Default is 1024.
 *
 * @returns The text of the control.
 *
 * @example
 * ```typescript
 * import { ControlGetText } from '@ahmic/autoit-js';
 *
 * const text = ControlGetText('Untitled - Notepad', '', 'Edit1');
 *
 * console.log(text); // Output: "Sample text"
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/ControlGetText.htm
 */
export function ControlGetText(
  windowTitle: string,
  windowText: string,
  controlId: string,
  characterCount: number = 1024,
): string {
  const [buffer, length] = createUnicodeBuffer(characterCount);

  autoit.invoke(
    'AU3_ControlGetText',
    VOID,
    [LPCWSTR, LPCWSTR, LPCWSTR, LPWSTR, INT],
    [windowTitle, windowText, controlId, buffer, length],
  );

  return unicodeBufferToString(buffer);
}
