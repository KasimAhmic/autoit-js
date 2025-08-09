import { INT, LPCWSTR, LPWSTR } from './@types';
import { autoit } from './lib/autoit';
import { createUnicodeBuffer, unicodeBufferToString } from './util';

/**
 * Retrieves the text from a specified part of a status bar in a window. Note that the status bar parts use
 * 1-based indexing.
 *
 * @param windowTitle The title of the window containing the status bar.
 * @param windowText Optional text found in the window.
 * @param part The part of the status bar to retrieve text from (default is 1).
 * @param characterCount The maximum number of characters to retrieve (default is 1024).
 *
 * @returns The text of the specified part of the status bar.
 *
 * @example
 * ```typescript
 * import { StatusbarGetTextSync } from '@ahmic/autoit-js';
 *
 * // The first part of Notepad's status bar is empty
 * const empty = StatusbarGetTextSync('Untitled - Notepad', '', 1);
 * const position = StatusbarGetTextSync('Untitled - Notepad', '', 2);
 * const zoom = StatusbarGetTextSync('Untitled - Notepad', '', 3);
 * const lingEndings = StatusbarGetTextSync('Untitled - Notepad', '', 4);
 * const encoding = StatusbarGetTextSync('Untitled - Notepad', '', 5);
 *
 * console.log(empty) // ""
 * console.log(position) // "  Ln 1, Col 1"
 * console.log(zoom) // " 100%"
 * console.log(lingEndings) // " Windows (CRLF)"
 * console.log(encoding) // " UTF-8"
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/StatusbarGetText.htm
 */
export function StatusbarGetTextSync(
  windowTitle: string,
  windowText: string = '',
  part: number = 1,
  characterCount: number = 1024,
): string {
  const [buffer, length] = createUnicodeBuffer(characterCount);

  autoit.invoke(
    'AU3_StatusbarGetText',
    INT,
    [LPCWSTR, LPCWSTR, INT, LPWSTR, INT],
    [windowTitle, windowText, part, buffer, length],
  );

  return unicodeBufferToString(buffer);
}

/**
 * Retrieves the text from a specified part of a status bar in a window. Note that the status bar parts use
 * 1-based indexing.
 *
 * @param windowTitle The title of the window containing the status bar.
 * @param windowText Optional text found in the window.
 * @param part The part of the status bar to retrieve text from (default is 1).
 * @param characterCount The maximum number of characters to retrieve (default is 1024).
 *
 * @returns A promise that resolves to the text of the specified part of the status bar.
 *
 * @example
 * ```typescript
 * import { StatusbarGetText } from '@ahmic/autoit-js';
 *
 * // The first part of Notepad's status bar is empty
 * const empty = await StatusbarGetText('Untitled - Notepad', '', 1);
 * const position = await StatusbarGetText('Untitled - Notepad', '', 2);
 * const zoom = await StatusbarGetText('Untitled - Notepad', '', 3);
 * const lingEndings = await StatusbarGetText('Untitled - Notepad', '', 4);
 * const encoding = await StatusbarGetText('Untitled - Notepad', '', 5);
 *
 * console.log(empty) // ""
 * console.log(position) // "  Ln 1, Col 1"
 * console.log(zoom) // " 100%"
 * console.log(lingEndings) // " Windows (CRLF)"
 * console.log(encoding) // " UTF-8"
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/StatusbarGetText.htm
 */
export async function StatusbarGetText(
  windowTitle: string,
  windowText: string = '',
  part: number = 1,
  characterCount: number = 1024,
): Promise<string> {
  const [buffer, length] = createUnicodeBuffer(characterCount);

  await autoit.invokeAsync(
    'AU3_StatusbarGetText',
    INT,
    [LPCWSTR, LPCWSTR, INT, LPWSTR, INT],
    [windowTitle, windowText, part, buffer, length],
  );

  return unicodeBufferToString(buffer);
}
