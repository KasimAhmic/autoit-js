import { HWND, INT, LPWSTR, VOID } from './@types';
import { autoit } from './lib/autoit';
import { createUnicodeBuffer, unicodeBufferToString } from './util';

/**
 * Retrieves the title of a window.
 *
 * @param windowHandle The handle of the window to search for.
 *
 * @returns The title of the window if found, or an empty string if not found.
 *
 * @example
 * ```typescript
 * import { WinGetTitleByHandle, WinGetHandle } from '@ahmic/autoit-js';
 *
 * const handle = WinGetHandle('Untitled - Notepad');
 * const title = WinGetTitleByHandle(handle);
 *
 * console.log(title); // Output: "Untitled - Notepad"
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinGetTitle.htm
 */
export function WinGetTitleByHandle(windowHandle: bigint, characterCount: number = 1024): string {
  const [buffer, length] = createUnicodeBuffer(characterCount);

  autoit.invoke('AU3_WinGetTitleByHandle', VOID, [HWND, LPWSTR, INT], [windowHandle, buffer, length]);

  return unicodeBufferToString(buffer);
}
