import { INT, LPCWSTR } from './@types';
import { autoit } from './lib/autoit';

/**
 * Disables a control in a window. Searches for the control by the title of its window, the text found within
 * its window, and the ID of the control.
 *
 * @param windowTitle The title of the window to access.
 * @param windowText Text found in the window to access.
 * @param controlId The control to disable.
 *
 * @returns 1 if success, 0 if failure.
 *
 * @example
 * ```typescript
 * import { ControlDisable } from '@ahmic/autoit-js';
 *
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
