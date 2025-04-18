import { INT, LPCWSTR } from './@types';
import { autoit } from './lib/autoit';

/**
 * Shows a control in a window.
 *
 * @param windowTitle The title of the window to search for.
 * @param windowText Optional text found in the window.
 * @param controlId The ID of the control to show.
 *
 * @returns 1 if successful, 0 otherwise.
 *
 * @example
 * ```typescript
 * import { ControlShow } from '@ahmic/autoit-js';
 *
 * ControlShow('Untitled - Notepad', '', 'Edit1');
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/ControlShow.htm
 */
export function ControlShow(windowTitle: string, windowText: string, controlId: string): number {
  return autoit.invoke(
    'AU3_ControlShow',
    INT,
    [LPCWSTR, LPCWSTR, LPCWSTR],
    [windowTitle, windowText, controlId],
  );
}
