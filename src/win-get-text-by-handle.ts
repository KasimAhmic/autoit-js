import { HWND, INT, LPWSTR, VOID } from './@types';
import { autoit } from './lib/autoit';
import { createUnicodeBuffer, unicodeBufferToString } from './util';

/**
 * Retrieves the text from a window.
 *
 * @param windowHandle The handle of the window to access.
 * @param characterCount The maximum number of characters to retrieve. Default is 1024.
 *
 * @returns The text of the window as a string.
 *
 * @example
 * ```typescript
 * import { WinGetTextByHandle, WinGetHandle } from '@ahmic/autoit-js';
 *
 * const windowHandle = WinGetHandle('Untitled - Notepad');
 * const text = WinGetTextByHandle(windowHandle);
 *
 * console.log(text); // Output: "Example text"
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinGetText.htm
 */
export function WinGetTextByHandle(windowHandle: bigint, characterCount: number = 1024): string {
  const [buffer, length] = createUnicodeBuffer(characterCount);

  autoit.invoke('AU3_WinGetTextByHandle', VOID, [HWND, LPWSTR, INT], [windowHandle, buffer, length]);

  return unicodeBufferToString(buffer);
}
