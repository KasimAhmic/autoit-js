import { INT, LPCWSTR, LPWSTR, VOID } from './@types';
import { autoit } from './lib/autoit';
import { createUnicodeBuffer, unicodeBufferToString } from './util';
import { HWND_HEX_SIZE } from './util/constants';

/**
 * Retrieves the handle of a window as a string.
 *
 * @param windowTitle The title of the window to access.
 * @param windowText Optional text found in the window.
 *
 * @returns The handle of the window as a string.
 *
 * @example
 * ```typescript
 * import { WinGetHandleAsText } from '@ahmic/autoit-js';
 *
 * const handleText = WinGetHandleAsText('Untitled - Notepad');
 *
 * console.log(handleText); // Output: "0x00123456" (example output)
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinGetHandle.htm
 */
export function WinGetHandleAsText(windowTitle: string, windowText: string = ''): string {
  const [buffer, length] = createUnicodeBuffer(HWND_HEX_SIZE);

  autoit.invoke(
    'AU3_WinGetHandleAsText',
    VOID,
    [LPCWSTR, LPCWSTR, LPWSTR, INT],
    [windowTitle, windowText, buffer, length],
  );

  return unicodeBufferToString(buffer);
}
