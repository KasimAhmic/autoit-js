import { INT, LPCWSTR } from './@types';
import { autoit } from './lib/autoit';

/**
 * Moves and resizes a control in a window.
 *
 * @param windowTitle The title of the window to access.
 * @param windowText Optional text found in the window.
 * @param controlId The ID of the control to move or resize.
 * @param x The new X coordinate of the control.
 * @param y The new Y coordinate of the control.
 * @param width The new width of the control. Default is -1 (no change).
 * @param height The new height of the control. Default is -1 (no change).
 *
 * @returns 1 if successful, 0 otherwise.
 *
 * @example
 * ```typescript
 * import { ControlMoveSync } from '@ahmic/autoit-js';
 *
 * ControlMoveSync('Untitled - Notepad', '', 'Edit1', 100, 100, 200, 50);
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/ControlMove.htm
 */
export function ControlMoveSync(
  windowTitle: string,
  windowText: string,
  controlId: string,
  x: number,
  y: number,
  width: number = -1,
  height: number = -1,
): number {
  // TODO: Add an overload that allows someone to pass a Rect object
  return autoit.invoke(
    'AU3_ControlMove',
    INT,
    [LPCWSTR, LPCWSTR, LPCWSTR, INT, INT, INT, INT],
    [windowTitle, windowText, controlId, x, y, width, height],
  );
}

/**
 * Moves and resizes a control in a window.
 *
 * @param windowTitle The title of the window to access.
 * @param windowText Optional text found in the window.
 * @param controlId The ID of the control to move or resize.
 * @param x The new X coordinate of the control.
 * @param y The new Y coordinate of the control.
 * @param width The new width of the control. Default is -1 (no change).
 * @param height The new height of the control. Default is -1 (no change).
 *
 * @returns A promise that resolves to 1 if successful, or 0 otherwise.
 *
 * @example
 * ```typescript
 * import { ControlMove } from '@ahmic/autoit-js';
 *
 * await ControlMove('Untitled - Notepad', '', 'Edit1', 100, 100, 200, 50);
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/ControlMove.htm
 */
export function ControlMove(
  windowTitle: string,
  windowText: string,
  controlId: string,
  x: number,
  y: number,
  width: number = -1,
  height: number = -1,
): Promise<number> {
  // TODO: Add an overload that allows someone to pass a Rect object
  return autoit.invokeAsync(
    'AU3_ControlMove',
    INT,
    [LPCWSTR, LPCWSTR, LPCWSTR, INT, INT, INT, INT],
    [windowTitle, windowText, controlId, x, y, width, height],
  );
}
