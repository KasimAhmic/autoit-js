import { INT, LPCWSTR, LPWSTR, VOID } from './@types';
import { autoit } from './lib/autoit';
import { createUnicodeBuffer, unicodeBufferToString } from './util';

/**
 * Retrieves the class list of a window.
 *
 * @param windowTitle The title of the window to access.
 * @param windowText Optional text found in the window.
 * @param characterCount The size of the buffer to store the result.
 *
 * @returns The class list of the window as a string.
 *
 * @example
 * ```typescript
 * import { WinGetClassList } from '@ahmic/autoit-js';
 *
 * const classList = WinGetClassList('Untitled - Notepad');
 *
 * console.log(classList); // Output: "Edit\nButton"
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinGetClassList.htm
 */
export function WinGetClassList(
  windowTitle: string,
  windowText: string = '',
  characterCount: number = 1024,
): string {
  const [buffer, length] = createUnicodeBuffer(characterCount);

  autoit.invoke(
    'AU3_WinGetClassList',
    VOID,
    [LPCWSTR, LPCWSTR, LPWSTR, INT],
    [windowTitle, windowText, buffer, length],
  );

  return unicodeBufferToString(buffer);
}
