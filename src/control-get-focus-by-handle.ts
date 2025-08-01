import { HWND, INT, LPWSTR, VOID } from './@types';
import { autoit } from './lib/autoit';
import { createUnicodeBuffer, unicodeBufferToString } from './util';

/**
 * Gets the ID of the control that has keyboard focus in a window.
 *
 * @param windowHandle The handle of the window to access.
 *
 * @returns The ID of the control that has keyboard focus.
 *
 * @example
 * ```typescript
 * import { ControlGetFocusByHandleSync, WinGetHandleSync } from '@ahmic/autoit-js';
 *
 * const windowHandle = WinGetHandleSync('Untitled - Notepad');
 *
 * const id = ControlGetFocusByHandleSync(windowHandle);
 *
 * console.log(id); // Output: "Edit1"
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/ControlGetFocus.htm
 */
export function ControlGetFocusByHandleSync(windowHandle: bigint): string {
  const [buffer, length] = createUnicodeBuffer(1024);

  autoit.invoke('AU3_ControlGetFocusByHandle', VOID, [HWND, LPWSTR, INT], [windowHandle, buffer, length]);

  return unicodeBufferToString(buffer);
}

/**
 * Gets the ID of the control that has keyboard focus in a window.
 *
 * @param windowHandle The handle of the window to access.
 *
 * @returns A promise that resolves to the ID of the control that has keyboard focus.
 *
 * @example
 * ```typescript
 * import { ControlGetFocusByHandle, WinGetHandle } from '@ahmic/autoit-js';
 *
 * const windowHandle = await WinGetHandle('Untitled - Notepad');
 *
 * const id = await ControlGetFocusByHandle(windowHandle);
 *
 * console.log(id); // Output: "Edit1"
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/ControlGetFocus.htm
 */
export async function ControlGetFocusByHandle(windowHandle: bigint): Promise<string> {
  const [buffer, length] = createUnicodeBuffer(1024);

  await autoit.invokeAsync(
    'AU3_ControlGetFocusByHandle',
    VOID,
    [HWND, LPWSTR, INT],
    [windowHandle, buffer, length],
  );

  return unicodeBufferToString(buffer);
}
