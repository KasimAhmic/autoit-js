import { HWND, INT, LPCWSTR } from './@types';
import { autoit } from './lib/autoit';
import { SendMode } from './send';

/**
 * Sends a string of text to a control in a window.
 *
 * @param windowHandle The handle of the window to access.
 * @param controlHandle The handle of the control to interact with.
 * @param value The string of text to send.
 * @param mode The send mode to use. See {@linkcode SendMode} for options. Default is {@linkcode SendMode.Default}.
 *
 * @returns 1 if successful, 0 otherwise.
 *
 * @example
 * ```typescript
 * import { ControlGetHandle, ControlSendByHandle, SendMode, WinGetHandle } from '@ahmic/autoit-js';
 *
 * const windowHandle = WinGetHandle('Untitled - Notepad');
 * const controlHandle = ControlGetHandle(windowHandle, 'Edit1');
 *
 * ControlSendByHandle(windowHandle, controlHandle, 'Hello, World!', SendMode.Default);
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/ControlSend.htm
 */
export function ControlSendByHandle(
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
