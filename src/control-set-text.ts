import { INT, LPCWSTR } from './@types';
import { autoit } from './lib/autoit';

/**
 * Sets the text of a control in a window.
 *
 * @param windowTitle The title of the window to search for.
 * @param windowText Optional text found in the window.
 * @param controlId The ID of the control to set text for.
 * @param value The text to set for the control.
 *
 * @returns 1 if successful, 0 otherwise.
 *
 * @example
 * ```typescript
 * import { ControlSetTextSync } from '@ahmic/autoit-js';
 *
 * ControlSetTextSync('Untitled - Notepad', '', 'Edit1', 'Hello, World!');
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/ControlSetText.htm
 */
export function ControlSetTextSync(
  windowTitle: string,
  windowText: string,
  controlId: string,
  value: string,
): number {
  return autoit.invoke(
    'AU3_ControlSetText',
    INT,
    [LPCWSTR, LPCWSTR, LPCWSTR, LPCWSTR],
    [windowTitle, windowText, controlId, value],
  );
}

/**
 * Sets the text of a control in a window.
 *
 * @param windowTitle The title of the window to search for.
 * @param windowText Optional text found in the window.
 * @param controlId The ID of the control to set text for.
 * @param value The text to set for the control.
 *
 * @returns A promise that resolves to 1 if successful, or 0 otherwise.
 *
 * @example
 * ```typescript
 * import { ControlSetText } from '@ahmic/autoit-js';
 *
 * await ControlSetText('Untitled - Notepad', '', 'Edit1', 'Hello, World!');
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/ControlSetText.htm
 */
export function ControlSetText(
  windowTitle: string,
  windowText: string,
  controlId: string,
  value: string,
): Promise<number> {
  return autoit.invokeAsync(
    'AU3_ControlSetText',
    INT,
    [LPCWSTR, LPCWSTR, LPCWSTR, LPCWSTR],
    [windowTitle, windowText, controlId, value],
  );
}
