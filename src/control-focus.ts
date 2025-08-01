import { INT, LPCWSTR } from './@types';
import { autoit } from './lib/autoit';

/**
 * Sets the keyboard focus to a control in a window.
 *
 * @param windowTitle The title of the window to access.
 * @param windowText Optional text found in the window.
 * @param controlId The ID of the control to focus.
 *
 * @return 1 if success, 0 if failure.
 *
 * @example
 * ```typescript
 * import { ControlFocusSync } from '@ahmic/autoit-js';
 *
 * ControlFocusSync('Untitled - Notepad', '', 'Edit1');
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/ControlFocus.htm
 */
export function ControlFocusSync(windowTitle: string, windowText: string, controlId: string): number {
  return autoit.invoke(
    'AU3_ControlFocus',
    INT,
    [LPCWSTR, LPCWSTR, LPCWSTR],
    [windowTitle, windowText, controlId],
  );
}

/**
 * Sets the keyboard focus to a control in a window.
 *
 * @param windowTitle The title of the window to access.
 * @param windowText Optional text found in the window.
 * @param controlId The ID of the control to focus.
 *
 * @return A promise that resolves to 1 if success, or 0 if failure.
 *
 * @example
 * ```typescript
 * import { ControlFocus } from '@ahmic/autoit-js';
 *
 * await ControlFocus('Untitled - Notepad', '', 'Edit1');
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/ControlFocus.htm
 */
export function ControlFocus(windowTitle: string, windowText: string, controlId: string): Promise<number> {
  return autoit.invokeAsync(
    'AU3_ControlFocus',
    INT,
    [LPCWSTR, LPCWSTR, LPCWSTR],
    [windowTitle, windowText, controlId],
  );
}
