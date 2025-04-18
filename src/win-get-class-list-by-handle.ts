import { HWND, INT, LPWSTR, VOID } from './@types';
import { autoit } from './lib/autoit';
import { createUnicodeBuffer, unicodeBufferToString } from './util';

/**
 * Retrieves the class list of a window.
 *
 * @param windowHandle The handle of the window to access.
 * @param characterCount The maximum number of characters to retrieve. Default is 1024.
 *
 * @returns The class list of the window as a string.
 *
 * @example
 * ```typescript
 * import { WinGetClassListByHandle, WinGetHandle } from '@ahmic/autoit-js';
 *
 * const windowHandle = WinGetHandle('Untitled - Notepad');
 * const classList = WinGetClassListByHandle(windowHandle);
 *
 * console.log(classList); // Output: "Edit\nButton"
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinGetClassList.htm
 */
export function WinGetClassListByHandle(windowHandle: bigint, characterCount: number = 1024): string {
  const [buffer, length] = createUnicodeBuffer(characterCount);

  autoit.invoke('AU3_WinGetClassListByHandle', VOID, [HWND, LPWSTR, INT], [windowHandle, buffer, length]);

  return unicodeBufferToString(buffer);
}
