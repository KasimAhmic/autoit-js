import { INT, LPCWSTR } from './@types';
import { autoit } from './lib/autoit';
import { SendMode } from './send';

/**
 * Sends a string of text to a control in a window.
 *
 * @param windowTitle The title of the window to access.
 * @param windowText Optional text found in the window.
 * @param controlId The ID of the control to send text to.
 * @param value The string of text to send.
 * @param mode The send mode to use. See {@linkcode SendMode} for details. Default is {@linkcode SendMode.Default}.
 *
 * @returns 1 if successful, 0 otherwise.
 *
 * @example
 * ```typescript
 * import { ControlSendSync, SendMode } from '@ahmic/autoit-js';
 *
 * ControlSendSync('Untitled - Notepad', '', 'Edit1', 'Hello, World!', SendMode.Default);
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/ControlSend.htm
 */
export function ControlSendSync(
  windowTitle: string,
  windowText: string,
  controlId: string,
  value: string,
  mode: SendMode = SendMode.Default,
): number {
  return autoit.invoke(
    'AU3_ControlSend',
    INT,
    [LPCWSTR, LPCWSTR, LPCWSTR, LPCWSTR, INT],
    [windowTitle, windowText, controlId, value, mode],
  );
}

/**
 * Sends a string of text to a control in a window.
 *
 * @param windowTitle The title of the window to access.
 * @param windowText Optional text found in the window.
 * @param controlId The ID of the control to send text to.
 * @param value The string of text to send.
 * @param mode The send mode to use. See {@linkcode SendMode} for details. Default is {@linkcode SendMode.Default}.
 *
 * @returns A promise that resolves to 1 if successful, or 0 otherwise.
 *
 * @example
 * ```typescript
 * import { ControlSend, SendMode } from '@ahmic/autoit-js';
 *
 * await ControlSend('Untitled - Notepad', '', 'Edit1', 'Hello, World!', SendMode.Default);
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/ControlSend.htm
 */
export function ControlSend(
  windowTitle: string,
  windowText: string,
  controlId: string,
  value: string,
  mode: SendMode = SendMode.Default,
): Promise<number> {
  return autoit.invokeAsync(
    'AU3_ControlSend',
    INT,
    [LPCWSTR, LPCWSTR, LPCWSTR, LPCWSTR, INT],
    [windowTitle, windowText, controlId, value, mode],
  );
}
