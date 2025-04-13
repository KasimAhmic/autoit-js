import { INT, LPCWSTR } from './@types';
import { autoit } from './lib/autoit';

/**
 * Enables a control in a window.
 *
 * @param windowTitle The title of the window to access.
 * @param windowText Text found in the window to access.
 * @param controlId The control to enable.
 *
 * @returns 1 if success, 0 if failure.
 *
 * @example
 * ```typescript
 * import { ControlEnable, ControlDisable } from '@ahmic/autoit-js';
 *
 * // Disable the Notepad window's edit control.
 * ControlDisable('Untitled - Notepad', 'Edit1');
 *
 * // Enable the Notepad window's edit control.
 * ControlEnable('Untitled - Notepad', 'Edit1');
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/ControlEnable.htm
 */
export function ControlEnable(windowTitle: string, windowText: string, controlId: string): number {
  return autoit.invoke(
    'AU3_ControlEnable',
    INT,
    [LPCWSTR, LPCWSTR, LPCWSTR],
    [windowTitle, windowText, controlId],
  );
}
