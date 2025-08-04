import koffi from 'koffi';

import { LPPOINT, Point, VOID } from './@types';
import { autoit } from './lib/autoit';

/**
 * Retrieves the current position of the mouse cursor.
 *
 * @returns A {@link Point} object containing the x and y coordinates of the mouse cursor.
 *
 * @example
 * ```typescript
 * import { MouseGetPosSync } from '@ahmic/autoit-js';
 *
 * const position = MouseGetPosSync();
 *
 * console.log(position); // Output: { x: 100, y: 200 }
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/MouseGetPos.htm
 */
export function MouseGetPosSync(): Point {
  const point = new Point();

  autoit.invoke('AU3_MouseGetPos', VOID, [koffi.out(LPPOINT)], [point]);

  return point;
}

/**
 * Retrieves the current position of the mouse cursor.
 *
 * @returns A promise that resolves to a {@link Point} object containing the x and y coordinates of the mouse
 * cursor.
 *
 * @example
 * ```typescript
 * import { MouseGetPos } from '@ahmic/autoit-js';
 *
 * const position = await MouseGetPos();
 *
 * console.log(position); // Output: { x: 100, y: 200 }
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/MouseGetPos.htm
 */
export async function MouseGetPos(): Promise<Point> {
  const point = new Point();

  await autoit.invokeAsync('AU3_MouseGetPos', VOID, [koffi.out(LPPOINT)], [point]);

  return point;
}
