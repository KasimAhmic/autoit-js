import { INT, LPCWSTR, LPWSTR, VOID } from './@types';
import { autoit } from './lib/autoit';
import { createUnicodeBuffer, unicodeBufferToString } from './util';

/**
 * Retrieves the text from a window.
 *
 * @param windowTitle The title of the window to access.
 * @param windowText Optional text found in the window.
 * @param characterCount The maximum number of characters to retrieve. Default is 1024.
 *
 * @returns The text of the window as a string.
 *
 * @example
 * ```typescript
 * import { WinGetTextSync } from '@ahmic/autoit-js';
 *
 * const text = WinGetTextSync('Untitled - Notepad');
 *
 * console.log(text); // Output: "Example text"
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinGetText.htm
 */
export function WinGetTextSync(
  windowTitle: string,
  windowText: string = '',
  characterCount: number = 1024,
): string {
  const [buffer, length] = createUnicodeBuffer(characterCount);

  autoit.invoke(
    'AU3_WinGetText',
    VOID,
    [LPCWSTR, LPCWSTR, LPWSTR, INT],
    [windowTitle, windowText, buffer, length],
  );

  return unicodeBufferToString(buffer);
}

/**
 * Retrieves the text from a window.
 *
 * @param windowTitle The title of the window to access.
 * @param windowText Optional text found in the window.
 * @param characterCount The maximum number of characters to retrieve. Default is 1024.
 *
 * @returns A promise that resolves to the text of the window as a string.
 *
 * @example
 * ```typescript
 * import { WinGetText } from '@ahmic/autoit-js';
 *
 * const text = await WinGetText('Untitled - Notepad');
 *
 * console.log(text); // Output: "Example text"
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinGetText.htm
 */
export async function WinGetText(
  windowTitle: string,
  windowText: string = '',
  characterCount: number = 1024,
): Promise<string> {
  const [buffer, length] = createUnicodeBuffer(characterCount);

  await autoit.invokeAsync(
    'AU3_WinGetText',
    VOID,
    [LPCWSTR, LPCWSTR, LPWSTR, INT],
    [windowTitle, windowText, buffer, length],
  );

  return unicodeBufferToString(buffer);
}
