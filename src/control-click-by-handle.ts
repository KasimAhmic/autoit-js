import { HWND, INT, LPCWSTR } from './@types';
import { autoit } from './lib/autoit';
import { MouseButton } from './mouse-click';
import { AU3_INTDEFAULT } from './util/constants';

/**
 * Simulates a mouse click on a control. Searches for the window and control by the handle of each. Unlike
 * {@linkcode MouseClick}, `ControlClickByHandle` won't move the mouse cursor but is capable of clicking on
 * controls that may be obscured by other windows.
 *
 * Where possible, you should prefer using this function over {@linkcode ControlClick} to avoid potential
 * issues with ambiguous window and control titles.
 *
 * @param windowHandle The handle of the window to access.
 * @param controlHandle The handle of the control to interact with.
 * @param button The mouse button to click. Default is {@linkcode MouseButton.Left}.
 * @param clicks The number of times to click the mouse. Default is 1.
 * @param x The x position to click within the control. Default is the center.
 * @param y The y position to click within the control. Default is the center.
 *
 * @returns 1 if success, 0 if failed.
 *
 * @example
 * ```typescript
 * import { ControlClickByHandle, ControlGetHandle, MouseButton, WinGetHandle } from '@ahmic/autoit-js';
 *
 * const windowHandle = WinGetHandle('Untitled - Notepad');
 * const controlHandle = ControlGetHandle(windowHandle, 'Edit1');
 *
 * // Click the Notepad window's edit control.
 * ControlClickByHandle(windowHandle, controlHandle);
 *
 * // Right click the Notepad window's edit control.
 * ControlClickByHandle(windowHandle, controlHandle, MouseButton.Right);
 *
 * // Double click the Notepad window's edit control.
 * ControlClickByHandle(windowHandle, controlHandle, MouseButton.Left, 2);
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/ControlClick.htm
 */
export function ControlClickByHandle(
  windowHandle: bigint,
  controlHandle: bigint,
  button: MouseButton = MouseButton.Left,
  clicks: number = 1,
  x: number = AU3_INTDEFAULT,
  y: number = AU3_INTDEFAULT,
): number {
  return autoit.invoke(
    'AU3_ControlClickByHandle',
    INT,
    [HWND, HWND, LPCWSTR, INT, INT, INT],
    [windowHandle, controlHandle, button, clicks, x, y],
  );
}
