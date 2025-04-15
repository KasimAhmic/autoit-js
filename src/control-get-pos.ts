import koffi from 'koffi';

import { INT, LPCWSTR, LPRECT, Rect } from './@types';
import { autoit } from './lib/autoit';

/**
 * Gets the position of a control in a window, relative to the window itself. Searches for the control by the
 * title of its window, the text found within its window, and the ID of the control.
 *
 * @param windowTitle The title of the window to access.
 * @param windowText Text found in the window to access.
 * @param controlId The control to get the position for.
 *
 * @returns The position of the control as a {@link Rect} object.
 *
 * @example
 * ```typescript
 * import { ControlGetPos } from '@ahmic/autoit-js';
 *
 * const rect = ControlGetPos('Untitled - Notepad', '', 'Edit1');
 *
 * console.log(rect); // Output: { left: 0, top: 0, right: 100, bottom: 100 }
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/ControlGetPos.htm
 */
export function ControlGetPos(windowTitle: string, windowText: string, controlId: string): Rect {
  const rect = new Rect();

  autoit.invoke(
    'AU3_ControlGetPos',
    INT,
    [LPCWSTR, LPCWSTR, LPCWSTR, koffi.out(LPRECT)],
    [windowTitle, windowText, controlId, rect],
  );

  return rect;
}
