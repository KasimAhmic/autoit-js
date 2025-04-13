import { INT, LPCWSTR } from './@types';
import { autoit } from './lib/autoit';

/**
 * Disables a control in a window.
 *
 * @param windowTitle The title of the window to access.
 * @param windowText Text found in the window to access.
 * @param controlId The control to disable.
 *
 * @returns @returns 1 if success, 0 if failure.
 *
 * @example
 * ```typescript
 * import { ControlDisable } from '@ahmic/autoit-js';
 *
 * // Disable the Notepad window's edit control.
 * ControlDisable('Untitled - Notepad', 'Edit1');
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/ControlDisable.htm
 */
export function ControlDisable(windowTitle: string, windowText: string, controlId: string): number {
  return autoit.invoke(
    'AU3_ControlDisable',
    INT,
    [LPCWSTR, LPCWSTR, LPCWSTR],
    [windowTitle, windowText, controlId],
  );
}
