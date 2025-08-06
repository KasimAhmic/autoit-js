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
 * import { WinGetTitleSync } from '@ahmic/autoit-js';
 *
 * const title = WinGetTitleSync('Untitled - Notepad');
 *
 * console.log(title); // Output: "Untitled - Notepad"
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinGetTitle.htm
 */
export function WinGetTitleSync(
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

/**
 * Retrieves the title of a window.
 *
 * @param windowTitle The title of the window to search for.
 * @param windowText Optional text found in the window.
 *
 * @returns A promise that resolves to the title of the window if found, or an empty string if not found.
 *
 * @example
 * ```typescript
 * import { WinGetTitle } from '@ahmic/autoit-js';
 *
 * const title = await WinGetTitle('Untitled - Notepad');
 *
 * console.log(title); // Output: "Untitled - Notepad"
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinGetTitle.htm
 */
export async function WinGetTitle(
  windowTitle: string,
  windowText: string = '',
  characterCount: number = 1024,
): Promise<string> {
  const [buffer, length] = createUnicodeBuffer(characterCount);

  await autoit.invokeAsync(
    'AU3_WinGetTitle',
    VOID,
    [LPCWSTR, LPCWSTR, LPWSTR, INT],
    [windowTitle, windowText, buffer, length],
  );

  return unicodeBufferToString(buffer);
}
