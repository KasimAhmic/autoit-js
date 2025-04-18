import { INT, LPCWSTR, LPWSTR, VOID } from './@types';
import { autoit } from './lib/autoit';
import { createUnicodeBuffer, unicodeBufferToString } from './util';

/**
 * Retrieves the title of a window.
 *
 * @param windowTitle The title of the window to search for.
 * @param windowText Optional text found in the window.
 *
 * @returns The title of the window if found, or an empty string if not found.
 *
 * @example
 * ```typescript
 * import { WinGetTitle } from '@ahmic/autoit-js';
 *
 * const title = WinGetTitle('Untitled - Notepad');
 *
 * console.log(title); // Output: "Untitled - Notepad"
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinGetTitle.htm
 */
export function WinGetTitle(
  windowTitle: string,
  windowText: string = '',
  characterCount: number = 1024,
): string {
  const [buffer, length] = createUnicodeBuffer(characterCount);

  autoit.invoke(
    'AU3_WinGetTitle',
    VOID,
    [LPCWSTR, LPCWSTR, LPWSTR, INT],
    [windowTitle, windowText, buffer, length],
  );

  return unicodeBufferToString(buffer);
}
