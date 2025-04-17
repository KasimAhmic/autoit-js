import { INT, LPCWSTR, LPWSTR, VOID } from './@types';
import { autoit } from './lib/autoit';
import { createUnicodeBuffer, unicodeBufferToString } from './util';

/**
 * Gets the ID of the control that has keyboard focus in a window.
 *
 * @param windowTitle The title of the window to access.
 * @param windowText Optional text found in the window.
 *
 * @returns The ID of the control that has keyboard focus.
 *
 * @example
 * ```typescript
 * import { ControlGetFocus } from '@ahmic/autoit-js';
 *
 * const className = ControlGetFocus('Untitled - Notepad');
 *
 * console.log(className); // Output: "Edit1"
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/ControlGetFocus.htm
 */
export function ControlGetFocus(windowTitle: string, windowText: string = ''): string {
  const [buffer, length] = createUnicodeBuffer(1024);

  autoit.invoke(
    'AU3_ControlGetFocus',
    VOID,
    [LPCWSTR, LPCWSTR, LPWSTR, INT],
    [windowTitle, windowText, buffer, length],
  );

  return unicodeBufferToString(buffer);
}
