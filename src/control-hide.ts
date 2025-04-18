import { INT, LPCWSTR } from './@types';
import { autoit } from './lib/autoit';

/**
 * Hides a control in a window.
 *
 * @param windowTitle The title of the window to search for.
 * @param windowText Optional text found in the window.
 * @param controlId The ID of the control to hide.
 *
 * @returns 1 if successful, 0 otherwise.
 *
 * @example
 * ```typescript
 * import { ControlHide } from '@ahmic/autoit-js';
 *
 * ControlHide('Untitled - Notepad', '', 'Edit1');
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/ControlHide.htm
 */
export function ControlHide(windowTitle: string, windowText: string, controlId: string): number {
  return autoit.invoke(
    'AU3_ControlHide',
    INT,
    [LPCWSTR, LPCWSTR, LPCWSTR],
    [windowTitle, windowText, controlId],
  );
}
