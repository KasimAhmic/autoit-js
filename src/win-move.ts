import { INT, LPCWSTR } from './@types';
import { autoit } from './lib/autoit';

/**
 * Moves a window to a specified position and resizes it.
 *
 * @param windowTitle The title of the window to move.
 * @param windowText Optional text found in the window.
 * @param x The X coordinate of the new position.
 * @param y The Y coordinate of the new position.
 * @param width The new width of the window.
 * @param height The new height of the window.
 *
 * @returns 1 if successful, 0 otherwise.
 *
 * @example
 * ```typescript
 * import { WinMoveSync } from '@ahmic/autoit-js';
 *
 * WinMoveSync('Untitled - Notepad', '', 100, 100, 800, 600);
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinMove.htm
 */
export function WinMoveSync(
  windowTitle: string,
  windowText: string = '',
  x: number,
  y: number,
  width: number = -1,
  height: number = -1,
): number {
  return autoit.invoke(
    'AU3_WinMove',
    INT,
    [LPCWSTR, LPCWSTR, INT, INT, INT, INT],
    [windowTitle, windowText, x, y, width, height],
  );
}

/**
 * Moves a window to a specified position and resizes it.
 *
 * @param windowTitle The title of the window to move.
 * @param windowText Optional text found in the window.
 * @param x The X coordinate of the new position.
 * @param y The Y coordinate of the new position.
 * @param width The new width of the window.
 * @param height The new height of the window.
 *
 * @returns A promise that resolves to 1 if successful, or 0 otherwise.
 *
 * @example
 * ```typescript
 * import { WinMove } from '@ahmic/autoit-js';
 *
 * await WinMove('Untitled - Notepad', '', 100, 100, 800, 600);
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinMove.htm
 */
export function WinMove(
  windowTitle: string,
  windowText: string = '',
  x: number,
  y: number,
  width: number = -1,
  height: number = -1,
): Promise<number> {
  return autoit.invokeAsync(
    'AU3_WinMove',
    INT,
    [LPCWSTR, LPCWSTR, INT, INT, INT, INT],
    [windowTitle, windowText, x, y, width, height],
  );
}
