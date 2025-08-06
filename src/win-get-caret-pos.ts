import koffi from 'koffi';

import { INT, IPoint, LPPOINT, Point } from './@types';
import { autoit } from './lib/autoit';

/**
 * Retrieves the position of the caret in the active window.
 *
 * @returns An {@linkcode IPoint} object containing the x and y coordinates of the caret.
 *
 * @example
 * ```typescript
 * import { WinGetCaretPosSync } from '@ahmic/autoit-js';
 *
 * const caretPos = WinGetCaretPosSync();
 *
 * console.log(caretPos); // Output: { x: 10, y: 20 }
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinGetCaretPos.htm
 */
export function WinGetCaretPosSync(): Point {
  const point = new Point();

  autoit.invoke('AU3_WinGetCaretPos', INT, [koffi.out(LPPOINT)], [point]);

  return point;
}

/**
 * Retrieves the position of the caret in the active window.
 *
 * @returns A promise that resolves to an {@linkcode IPoint} object containing the x and y coordinates of the
 * caret.
 *
 * @example
 * ```typescript
 * import { WinGetCaretPos } from '@ahmic/autoit-js';
 *
 * const caretPos = await WinGetCaretPos();
 *
 * console.log(caretPos); // Output: { x: 10, y: 20 }
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinGetCaretPos.htm
 */
export async function WinGetCaretPos(): Promise<IPoint> {
  const point = new Point();

  await autoit.invokeAsync('AU3_WinGetCaretPos', INT, [koffi.out(LPPOINT)], [point]);

  return point;
}
