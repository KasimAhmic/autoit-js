import { HWND, INT, LPCWSTR, LPWSTR, VOID } from './@types';
import { Command } from './control-command';
import { autoit } from './lib/autoit';
import { createUnicodeBuffer, unicodeBufferToString } from './util';

/**
 * Sends a command to a control in a window.
 *
 * @param windowHandle The handle of the window to access.
 * @param controlHandle The handle of the control to send the command to.
 * @param command The command to send to the control.
 * @param option Optional additional parameter for the command.
 * @param characterCount The size of the buffer to store the result.
 *
 * @returns The result of the command as a string.
 *
 * @example
 * ```typescript
 * import { ControlCommandByHandle, WinGetHandle, ControlGetHandle } from '@ahmic/autoit-js';
 *
 * const windowHandle = WinGetHandle('Untitled - Notepad');
 * const controlHandle = ControlGetHandle(windowHandle, 'Edit1');
 * const result = ControlCommandByHandle(windowHandle, controlHandle, 'IsVisible');
 *
 * console.log(result); // Output: "1" if visible, "0" otherwise
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/ControlCommand.htm
 */
export function ControlCommandByHandle(
  windowHandle: bigint,
  controlHandle: bigint,
  command: Command,
  option: string = '',
  characterCount: number = 1024,
): string {
  const [buffer, length] = createUnicodeBuffer(characterCount);

  autoit.invoke(
    'AU3_ControlCommandByHandle',
    VOID,
    [HWND, HWND, LPCWSTR, LPCWSTR, LPWSTR, INT],
    [windowHandle, controlHandle, command, option, buffer, length],
  );

  return unicodeBufferToString(buffer);
}
