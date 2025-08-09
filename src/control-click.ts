import { INT, LPCWSTR } from './@types';
import { autoit } from './lib/autoit';
import { MouseButton } from './mouse-click';
import { AU3_INTDEFAULT } from './util/constants';

/**
 * Simulates a mouse click on a control. Unlike {@linkcode MouseClickSync}, `ControlClickSync` won't move the
 * mouse cursor but is capable of clicking on controls that may be obscured by other windows.
 *
 * Where possible, you should prefer using {@linkcode ControlClickByHandleSync} to avoid potential issues
 * with ambiguous window and control titles.
 *
 * @param windowTitle The title of the window to access.
 * @param windowText Optional text found in the window.
 * @param controlId The control to interact with.
 * @param button The mouse button to click. Default is {@linkcode MouseButton.Left}.
 * @param clicks The number of times to click the mouse. Default is 1.
 * @param x The x position to click within the control. Default is the center.
 * @param y The y position to click within the control. Default is the center.
 *
 * @returns 1 if success, 0 if failed.
 *
 * @example
 * ```typescript
 * import { ControlClickSync } from '@ahmic/autoit-js';
 *
 * // Click the Notepad window's edit control.
 * ControlClickSync('Untitled - Notepad', '', 'Edit1');
 *
 * // Right click the Notepad window's edit control.
 * ControlClickSync('Untitled - Notepad', '', 'Edit1', MouseButton.Right);
 *
 * // Double click the Notepad window's edit control.
 * ControlClickSync('Untitled - Notepad', '', 'Edit1', MouseButton.Left, 2);
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/ControlClick.htm
 */
export function ControlClickSync(
  windowTitle: string,
  windowText: string,
  controlId: string,
  button: MouseButton = MouseButton.Left,
  clicks: number = 1,
  x: number = AU3_INTDEFAULT,
  y: number = AU3_INTDEFAULT,
): number {
  return autoit.invoke(
    'AU3_ControlClick',
    INT,
    [LPCWSTR, LPCWSTR, LPCWSTR, LPCWSTR, INT, INT, INT],
    [windowTitle, windowText, controlId, button, clicks, x, y],
  );
}

/**
 * Simulates a mouse click on a control. Unlike {@linkcode MouseClick}, `ControlClick` won't move the mouse
 * cursor but is capable of clicking on controls that may be obscured by other windows.
 *
 * Where possible, you should prefer using {@linkcode ControlClickByHandle} to avoid potential issues with
 * ambiguous window and control titles.
 *
 * @param windowTitle The title of the window to access.
 * @param windowText Optional text found in the window.
 * @param controlId The control to interact with.
 * @param button The mouse button to click. Default is {@linkcode MouseButton.Left}.
 * @param clicks The number of times to click the mouse. Default is 1.
 * @param x The x position to click within the control. Default is the center.
 * @param y The y position to click within the control. Default is the center.
 *
 * @returns A promise that resolves to 1 if success, 0 if failed.
 *
 * @example
 * ```typescript
 * import { ControlClick } from '@ahmic/autoit-js';
 *
 * // Click the Notepad window's edit control.
 * await ControlClick('Untitled - Notepad', '', 'Edit1');
 *
 * // Right click the Notepad window's edit control.
 * await ControlClick('Untitled - Notepad', '', 'Edit1', MouseButton.Right);
 *
 * // Double click the Notepad window's edit control.
 * await ControlClick('Untitled - Notepad', '', 'Edit1', MouseButton.Left, 2);
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/ControlClick.htm
 */
export function ControlClick(
  windowTitle: string,
  windowText: string,
  controlId: string,
  button: MouseButton = MouseButton.Left,
  clicks: number = 1,
  x: number = AU3_INTDEFAULT,
  y: number = AU3_INTDEFAULT,
): Promise<number> {
  return autoit.invokeAsync(
    'AU3_ControlClick',
    INT,
    [LPCWSTR, LPCWSTR, LPCWSTR, LPCWSTR, INT, INT, INT],
    [windowTitle, windowText, controlId, button, clicks, x, y],
  );
}
