import { HWND, INT } from './@types';
import { autoit } from './lib/autoit';

/**
 * Moves and resizes a control in a window.
 *
 * @param windowHandle The handle of the window to access.
 * @param controlHandle The handle of the control to move or resize.
 * @param x The new X coordinate of the control.
 * @param y The new Y coordinate of the control.
 * @param width The new width of the control. Default is -1 (no change).
 * @param height The new height of the control. Default is -1 (no change).
 *
 * @returns 1 if successful, 0 otherwise.
 *
 * @example
 * ```typescript
 * import { ControlMoveByHandleSync, ControlGetHandleSync, WinGetHandleSync } from '@ahmic/autoit-js';
 *
 * const windowHandle = WinGetHandleSync('Untitled - Notepad');
 * const controlHandle = ControlGetHandleSync(windowHandle, 'Edit1');
 *
 * ControlMoveByHandleSync(windowHandle, controlHandle, 100, 100, 200, 50);
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/ControlMove.htm
 */
export function ControlMoveByHandleSync(
  windowHandle: bigint,
  controlHandle: bigint,
  x: number,
  y: number,
  width: number = -1,
  height: number = -1,
): number {
  return autoit.invoke(
    'AU3_ControlMoveByHandle',
    INT,
    [HWND, HWND, INT, INT, INT, INT],
    [windowHandle, controlHandle, x, y, width, height],
  );
}

/**
 * Moves and resizes a control in a window.
 *
 * @param windowHandle The handle of the window to access.
 * @param controlHandle The handle of the control to move or resize.
 * @param x The new X coordinate of the control.
 * @param y The new Y coordinate of the control.
 * @param width The new width of the control. Default is -1 (no change).
 * @param height The new height of the control. Default is -1 (no change).
 *
 * @returns A promise that resolves to 1 if successful, or 0 otherwise.
 *
 * @example
 * ```typescript
 * import { ControlMoveByHandle, ControlGetHandle, WinGetHandle } from '@ahmic/autoit-js';
 *
 * const windowHandle = await WinGetHandle('Untitled - Notepad');
 * const controlHandle = await ControlGetHandle(windowHandle, 'Edit1');
 *
 * await ControlMoveByHandle(windowHandle, controlHandle, 100, 100, 200, 50);
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/ControlMove.htm
 */
export function ControlMoveByHandle(
  windowHandle: bigint,
  controlHandle: bigint,
  x: number,
  y: number,
  width: number = -1,
  height: number = -1,
): Promise<number> {
  return autoit.invokeAsync(
    'AU3_ControlMoveByHandle',
    INT,
    [HWND, HWND, INT, INT, INT, INT],
    [windowHandle, controlHandle, x, y, width, height],
  );
}
