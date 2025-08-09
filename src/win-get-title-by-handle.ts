import { HWND, INT, LPWSTR, VOID } from './@types';
import { autoit } from './lib/autoit';
import { createUnicodeBuffer, unicodeBufferToString } from './util';

/**
 * Retrieves the title of a window.
 *
 * @param windowHandle The handle of the window to search for.
 * @param characterCount The number of characters to read from the window title buffer (default is 1024).
 *
 * @returns The title of the window if found, or an empty string if not found.
 *
 * @example
 * ```typescript
 * import { WinGetTitleByHandleSync, WinGetHandleSync } from '@ahmic/autoit-js';
 *
 * const handle = WinGetHandleSync('Untitled - Notepad');
 * const title = WinGetTitleByHandleSync(handle);
 *
 * console.log(title); // Output: "Untitled - Notepad"
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinGetTitle.htm
 */
export function WinGetTitleByHandleSync(windowHandle: bigint, characterCount: number = 1024): string {
  const [buffer, length] = createUnicodeBuffer(characterCount);

  autoit.invoke('AU3_WinGetTitleByHandle', VOID, [HWND, LPWSTR, INT], [windowHandle, buffer, length]);

  return unicodeBufferToString(buffer);
}

/**
 * Retrieves the title of a window.
 *
 * @param windowHandle The handle of the window to search for.
 * @param characterCount The number of characters to read from the window title buffer (default is 1024).
 *
 * @returns A promise that resolves to the title of the window if found, or an empty string if not found.
 *
 * @example
 * ```typescript
 * import { WinGetTitleByHandle, WinGetHandle } from '@ahmic/autoit-js';
 *
 * const handle = await WinGetHandle('Untitled - Notepad');
 * const title = await WinGetTitleByHandle(handle);
 *
 * console.log(title); // Output: "Untitled - Notepad"
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinGetTitle.htm
 */
export async function WinGetTitleByHandle(
  windowHandle: bigint,
  characterCount: number = 1024,
): Promise<string> {
  const [buffer, length] = createUnicodeBuffer(characterCount);

  await autoit.invokeAsync(
    'AU3_WinGetTitleByHandle',
    VOID,
    [HWND, LPWSTR, INT],
    [windowHandle, buffer, length],
  );

  return unicodeBufferToString(buffer);
}
