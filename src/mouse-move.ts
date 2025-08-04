import { INT } from './@types';
import { autoit } from './lib/autoit';

/**
 * Moves the mouse pointer to a specified location on the screen.
 *
 * @param x The x-coordinate to move the mouse to.
 * @param y The y-coordinate to move the mouse to.
 * @param speed Optional speed of the mouse movement (1 is slow, 100 is fast, -1 is instant).
 *
 * @returns 1 if successful, 0 otherwise.
 *
 * @example
 * ```typescript
 * import { MouseMoveSync } from '@ahmic/autoit-js';
 *
 * MouseMoveSync(100, 200, 50);
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/MouseMove.htm
 */
export function MouseMoveSync(x: number, y: number, speed: number = -1): number {
  return autoit.invoke('AU3_MouseMove', INT, [INT, INT, INT], [x, y, speed]);
}

/**
 * Moves the mouse pointer to a specified location on the screen.
 *
 * @param x The x-coordinate to move the mouse to.
 * @param y The y-coordinate to move the mouse to.
 * @param speed Optional speed of the mouse movement (1 is slow, 100 is fast, -1 is instant).
 *
 * @returns A promise that resolves to 1 if successful, or 0 otherwise.
 *
 * @example
 * ```typescript
 * import { MouseMove } from '@ahmic/autoit-js';
 *
 * await MouseMove(100, 200, 50);
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/MouseMove.htm
 */
export function MouseMove(x: number, y: number, speed: number = -1): Promise<number> {
  return autoit.invokeAsync('AU3_MouseMove', INT, [INT, INT, INT], [x, y, speed]);
}
