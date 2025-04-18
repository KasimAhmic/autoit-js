import { INT, LPWSTR, VOID } from './@types';
import { autoit } from './lib/autoit';
import { createUnicodeBuffer, unicodeBufferToString } from './util/buffer.util';

/**
 * Retrieves text from the clipboard.
 *
 * @param characterCount The maximum number of characters to retrieve. Default is 2048.
 *
 * @returns The text from the clipboard.
 *
 * @example
 * ```typescript
 * import { ClipGet } from '@ahmic/autoit-js';
 *
 * // Assuming the text "Hello" is in the clipboard
 *
 * for (let i = 0; i < 5; i++) {
 *   console.log(ClipGet(i + 1));
 * }
 *
 * // Output:
 * // H
 * // He
 * // Hel
 * // Hell
 * // Hello
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/ClipGet.htm
 */
export function ClipGet(characterCount: number = 2048): string {
  const [buffer, length] = createUnicodeBuffer(characterCount);

  autoit.invoke('AU3_ClipGet', VOID, [LPWSTR, INT], [buffer, length]);

  return unicodeBufferToString(buffer);
}
