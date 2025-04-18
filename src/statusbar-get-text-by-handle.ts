import { HWND, INT, LPWSTR } from './@types';
import { autoit } from './lib/autoit';
import { createUnicodeBuffer, unicodeBufferToString } from './util';

/**
 * Retrieves the text from a specified part of a status bar in a window. Note that the status bar parts use
 * 1-based indexing.
 *
 * @param windowHandle The handle of the window containing the status bar.
 * @param part The part of the status bar to retrieve text from (default is 1).
 * @param characterCount The maximum number of characters to retrieve (default is 1024).
 *
 * @returns The text of the specified part of the status bar.
 *
 * @example
 * ```typescript
 * import { StatusbarGetText, WinGetHandle } from '@ahmic/autoit-js';
 *
 * const windowHandle = WinGetHandle('Untitled - Notepad');
 *
 * // The first part of Notepad's status bar is empty
 * const empty = StatusbarGetText(windowHandle, 1);
 * const position = StatusbarGetText(windowHandle, 2);
 * const zoom = StatusbarGetText(windowHandle, 3);
 * const lingEndings = StatusbarGetText(windowHandle, 4);
 * const encoding = StatusbarGetText(windowHandle, 5);
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
export function StatusbarGetTextByHandle(
  windowHandle: bigint,
  part: number = 1,
  characterCount: number = 1024,
): string {
  const [buffer, length] = createUnicodeBuffer(characterCount);

  autoit.invoke(
    'AU3_StatusbarGetTextByHandle',
    INT,
    [HWND, INT, LPWSTR, INT],
    [windowHandle, part, buffer, length],
  );

  return unicodeBufferToString(buffer);
}
