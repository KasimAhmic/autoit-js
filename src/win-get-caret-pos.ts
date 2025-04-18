import koffi from 'koffi';

import { INT, LPPOINT, Point } from './@types';
import { autoit } from './lib/autoit';

/**
 * Retrieves the position of the caret in the active window.
 *
 * @returns An object containing the x and y coordinates of the caret.
 *
 * @example
 * ```typescript
 * import { WinGetCaretPos } from '@ahmic/autoit-js';
 *
 * const caretPos = WinGetCaretPos();
 *
 * console.log(caretPos); // Output: { x: 10, y: 20 }
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinGetCaretPos.htm
 */
export function WinGetCaretPos(): Point {
  const point = new Point();

  autoit.invoke('AU3_WinGetCaretPos', INT, [koffi.out(LPPOINT)], [point]);

  return point;
}
