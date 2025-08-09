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
 * import { WinGetTextByHandleSync, WinGetHandleSync } from '@ahmic/autoit-js';
 *
 * const windowHandle = WinGetHandleSync('Untitled - Notepad');
 * const text = WinGetTextByHandleSync(windowHandle);
 *
 * console.log(text); // Output: "Example text"
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinGetText.htm
 */
export function WinGetTextByHandleSync(windowHandle: bigint, characterCount: number = 1024): string {
  const [buffer, length] = createUnicodeBuffer(characterCount);

  autoit.invoke('AU3_WinGetTextByHandle', VOID, [HWND, LPWSTR, INT], [windowHandle, buffer, length]);

  return unicodeBufferToString(buffer);
}

/**
 * Retrieves the text from a window.
 *
 * @param windowHandle The handle of the window to access.
 * @param characterCount The maximum number of characters to retrieve. Default is 1024.
 *
 * @returns A promise that resolves to the text of the window as a string.
 *
 * @example
 * ```typescript
 * import { WinGetTextByHandle, WinGetHandle } from '@ahmic/autoit-js';
 *
 * const windowHandle = await WinGetHandle('Untitled - Notepad');
 * const text = await WinGetTextByHandle(windowHandle);
 *
 * console.log(text); // Output: "Example text"
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinGetText.htm
 */
export async function WinGetTextByHandle(
  windowHandle: bigint,
  characterCount: number = 1024,
): Promise<string> {
  const [buffer, length] = createUnicodeBuffer(characterCount);

  await autoit.invokeAsync(
    'AU3_WinGetTextByHandle',
    VOID,
    [HWND, LPWSTR, INT],
    [windowHandle, buffer, length],
  );

  return unicodeBufferToString(buffer);
}
