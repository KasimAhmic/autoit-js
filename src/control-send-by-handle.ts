import { HWND, INT, LPCWSTR } from './@types';
import { autoit } from './lib/autoit';
import { SendMode } from './send';

/**
 * Sends a string of text to a control in a window.
 *
 * @param windowHandle The handle of the window to access.
 * @param controlHandle The handle of the control to interact with.
 * @param value The string of text to send.
 * @param mode The send mode to use. See {@linkcode SendMode} for details. Default is {@linkcode SendMode.Default}.
 *
 * @returns 1 if successful, 0 otherwise.
 *
 * @example
 * ```typescript
 * import { ControlGetHandleSync, ControlSendByHandleSync, SendMode, WinGetHandleSync } from '@ahmic/autoit-js';
 *
 * const windowHandle = WinGetHandleSync('Untitled - Notepad');
 * const controlHandle = ControlGetHandleSync(windowHandle, 'Edit1');
 *
 * ControlSendByHandleSync(windowHandle, controlHandle, 'Hello, World!', SendMode.Default);
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/ControlSend.htm
 */
export function ControlSendByHandleSync(
  windowHandle: bigint,
  controlHandle: bigint,
  value: string,
  mode: SendMode = SendMode.Default,
): number {
  return autoit.invoke(
    'AU3_ControlSendByHandle',
    INT,
    [HWND, HWND, LPCWSTR, INT],
    [windowHandle, controlHandle, value, mode],
  );
}

/**
 * Sends a string of text to a control in a window.
 *
 * @param windowHandle The handle of the window to access.
 * @param controlHandle The handle of the control to interact with.
 * @param value The string of text to send.
 * @param mode The send mode to use. See {@linkcode SendMode} for details. Default is {@linkcode SendMode.Default}.
 *
 * @returns A promise that resolves to 1 if successful, or 0 otherwise.
 *
 * @example
 * ```typescript
 * import { ControlGetHandle, ControlSendByHandle, SendMode, WinGetHandle } from '@ahmic/autoit-js';
 *
 * const windowHandle = await WinGetHandle('Untitled - Notepad');
 * const controlHandle = await ControlGetHandle(windowHandle, 'Edit1');
 *
 * await ControlSendByHandle(windowHandle, controlHandle, 'Hello, World!', SendMode.Default);
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/ControlSend.htm
 */
export function ControlSendByHandle(
  windowHandle: bigint,
  controlHandle: bigint,
  value: string,
  mode: SendMode = SendMode.Default,
): Promise<number> {
  return autoit.invokeAsync(
    'AU3_ControlSendByHandle',
    INT,
    [HWND, HWND, LPCWSTR, INT],
    [windowHandle, controlHandle, value, mode],
  );
}
