import { HWND, INT } from './@types';
import { autoit } from './lib/autoit';

/**
 * Moves a window to a specified position and resizes it.
 *
 * @param windowHandle The handle of the window to move.
 * @param x The X coordinate of the new position.
 * @param y The Y coordinate of the new position.
 * @param width The new width of the window.
 * @param height The new height of the window.
 *
 * @returns 1 if successful, 0 otherwise.
 *
 * @example
 * ```typescript
 * import { WinMoveByHandleSync, WinGetHandleSync } from '@ahmic/autoit-js';
 *
 * const windowHandle = WinGetHandleSync('Untitled - Notepad');
 *
 * WinMoveByHandleSync(windowHandle, 100, 100, 800, 600);
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinMove.htm
 */
export function WinMoveByHandleSync(
  windowHandle: bigint,
  x: number,
  y: number,
  width: number = -1,
  height: number = -1,
): number {
  return autoit.invoke(
    'AU3_WinMoveByHandle',
    INT,
    [HWND, INT, INT, INT, INT],
    [windowHandle, x, y, width, height],
  );
}

/**
 * Moves a window to a specified position and resizes it.
 *
 * @param windowHandle The handle of the window to move.
 * @param x The X coordinate of the new position.
 * @param y The Y coordinate of the new position.
 * @param width The new width of the window.
 * @param height The new height of the window.
 *
 * @returns A promise that resolves to 1 if successful, or 0 otherwise.
 *
 * @example
 * ```typescript
 * import { WinMoveByHandle, WinGetHandle } from '@ahmic/autoit-js';
 *
 * const windowHandle = await WinGetHandle('Untitled - Notepad');
 *
 * await WinMoveByHandle(windowHandle, 100, 100, 800, 600);
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinMove.htm
 */
export function WinMoveByHandle(
  windowHandle: bigint,
  x: number,
  y: number,
  width: number = -1,
  height: number = -1,
): Promise<number> {
  return autoit.invokeAsync(
    'AU3_WinMoveByHandle',
    INT,
    [HWND, INT, INT, INT, INT],
    [windowHandle, x, y, width, height],
  );
}
