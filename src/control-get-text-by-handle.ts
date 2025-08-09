import { HWND, INT, LPWSTR, VOID } from './@types';
import { autoit } from './lib/autoit';
import { createUnicodeBuffer, unicodeBufferToString } from './util';

/**
 * Retrieves the text from a control in a window.
 *
 * @param windowHandle The handle of the window to access.
 * @param controlHandle The handle of the control to retrieve text from.
 * @param characterCount The maximum number of characters to retrieve. Default is 1024.
 *
 * @returns The text of the control.
 *
 * @example
 * ```typescript
 * import { ControlGetTextByHandleSync, ControlGetHandleSync, WinGetHandleSync } from '@ahmic/autoit-js';
 *
 * const windowHandle = WinGetHandleSync('Untitled - Notepad');
 * const controlHandle = ControlGetHandleSync(windowHandle, 'Edit1');
 *
 * const text = ControlGetTextByHandleSync(windowHandle, controlHandle);
 *
 * console.log(text); // Output: "Sample text"
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/ControlGetText.htm
 */
export function ControlGetTextByHandleSync(
  windowHandle: bigint,
  controlHandle: bigint,
  characterCount: number = 1024,
): string {
  const [buffer, length] = createUnicodeBuffer(characterCount);

  autoit.invoke(
    'AU3_ControlGetTextByHandle',
    VOID,
    [HWND, HWND, LPWSTR, INT],
    [windowHandle, controlHandle, buffer, length],
  );

  return unicodeBufferToString(buffer);
}

/**
 * Retrieves the text from a control in a window.
 *
 * @param windowHandle The handle of the window to access.
 * @param controlHandle The handle of the control to retrieve text from.
 * @param characterCount The maximum number of characters to retrieve. Default is 1024.
 *
 * @returns A promise that resolves to the text of the control.
 *
 * @example
 * ```typescript
 * import { ControlGetTextByHandle, ControlGetHandle, WinGetHandle } from '@ahmic/autoit-js';
 *
 * const windowHandle = WinGetHandle('Untitled - Notepad');
 * const controlHandle = ControlGetHandle(windowHandle, 'Edit1');
 *
 * const text = await ControlGetTextByHandle(windowHandle, controlHandle);
 *
 * console.log(text); // Output: "Sample text"
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/ControlGetText.htm
 */
export async function ControlGetTextByHandle(
  windowHandle: bigint,
  controlHandle: bigint,
  characterCount: number = 1024,
): Promise<string> {
  const [buffer, length] = createUnicodeBuffer(characterCount);

  await autoit.invokeAsync(
    'AU3_ControlGetTextByHandle',
    VOID,
    [HWND, HWND, LPWSTR, INT],
    [windowHandle, controlHandle, buffer, length],
  );

  return unicodeBufferToString(buffer);
}
