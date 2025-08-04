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
 * import { ControlShowSync } from '@ahmic/autoit-js';
 *
 * ControlShowSync('Untitled - Notepad', '', 'Edit1');
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/ControlShow.htm
 */
export function ControlShowSync(windowTitle: string, windowText: string, controlId: string): number {
  return autoit.invoke(
    'AU3_ControlShow',
    INT,
    [LPCWSTR, LPCWSTR, LPCWSTR],
    [windowTitle, windowText, controlId],
  );
}

/**
 * Shows a control in a window.
 *
 * @param windowTitle The title of the window to search for.
 * @param windowText Optional text found in the window.
 * @param controlId The ID of the control to show.
 *
 * @returns A promise that resolves to 1 if successful, or 0 otherwise.
 *
 * @example
 * ```typescript
 * import { ControlShow } from '@ahmic/autoit-js';
 *
 * await ControlShow('Untitled - Notepad', '', 'Edit1');
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/ControlShow.htm
 */
export function ControlShow(windowTitle: string, windowText: string, controlId: string): Promise<number> {
  return autoit.invokeAsync(
    'AU3_ControlShow',
    INT,
    [LPCWSTR, LPCWSTR, LPCWSTR],
    [windowTitle, windowText, controlId],
  );
}
