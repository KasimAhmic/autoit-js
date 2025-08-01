import { INT, LPCWSTR } from './@types';
import { autoit } from './lib/autoit';

/**
 * Enables a control in a window.
 *
 * @param windowTitle The title of the window to access.
 * @param windowText Optional text found in the window.
 * @param controlId The control to enable.
 *
 * @returns 1 if success, 0 if failure.
 *
 * @example
 * ```typescript
 * import { ControlEnableSync, ControlDisableSync } from '@ahmic/autoit-js';
 *
 * // Disable the Notepad window's edit control.
 * ControlDisableSync('Untitled - Notepad', 'Edit1');
 *
 * // Enable the Notepad window's edit control.
 * ControlEnableSync('Untitled - Notepad', 'Edit1');
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/ControlEnable.htm
 */
export function ControlEnableSync(windowTitle: string, windowText: string, controlId: string): number {
  return autoit.invoke(
    'AU3_ControlEnable',
    INT,
    [LPCWSTR, LPCWSTR, LPCWSTR],
    [windowTitle, windowText, controlId],
  );
}

/**
 * Enables a control in a window.
 *
 * @param windowTitle The title of the window to access.
 * @param windowText Optional text found in the window.
 * @param controlId The control to enable.
 *
 * @returns A promise that resolves to 1 if success, or 0 if failure.
 *
 * @example
 * ```typescript
 * import { ControlEnable, ControlDisable } from '@ahmic/autoit-js';
 *
 * // Disable the Notepad window's edit control.
 * await ControlDisable('Untitled - Notepad', 'Edit1');
 *
 * // Enable the Notepad window's edit control.
 * await ControlEnable('Untitled - Notepad', 'Edit1');
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/ControlEnable.htm
 */
export function ControlEnable(windowTitle: string, windowText: string, controlId: string): Promise<number> {
  return autoit.invokeAsync(
    'AU3_ControlEnable',
    INT,
    [LPCWSTR, LPCWSTR, LPCWSTR],
    [windowTitle, windowText, controlId],
  );
}
