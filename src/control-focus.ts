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
 * import { ControlFocus } from '@ahmic/autoit-js';
 *
 * ControlFocus('Untitled - Notepad', '', 'Edit1');
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/ControlFocus.htm
 */
export function ControlFocus(windowTitle: string, windowText: string, controlId: string): number {
  return autoit.invoke(
    'AU3_ControlFocus',
    INT,
    [LPCWSTR, LPCWSTR, LPCWSTR],
    [windowTitle, windowText, controlId],
  );
}
