import koffi from 'koffi';

import { INT, IRect, LPCWSTR, LPRECT, Rect } from './@types';
import { autoit } from './lib/autoit';

/**
 * Gets the position of a control in a window, relative to the window itself.
 *
 * @param windowTitle The title of the window to access.
 * @param windowText Optional text found in the window.
 * @param controlId The control to get the position for.
 *
 * @returns The position of the control as a {@linkcode Rect} object.
 *
 * @example
 * ```typescript
 * import { ControlGetPosSync } from '@ahmic/autoit-js';
 *
 * const rect = ControlGetPosSync('Untitled - Notepad', '', 'Edit1');
 *
 * console.log(rect); // Output: { left: 0, top: 0, right: 100, bottom: 100 }
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/ControlGetPos.htm
 */
export function ControlGetPosSync(windowTitle: string, windowText: string, controlId: string): IRect {
  const rect = new Rect();

  autoit.invoke(
    'AU3_ControlGetPos',
    INT,
    [LPCWSTR, LPCWSTR, LPCWSTR, koffi.out(LPRECT)],
    [windowTitle, windowText, controlId, rect],
  );

  return rect;
}

/**
 * Gets the position of a control in a window, relative to the window itself.
 *
 * @param windowTitle The title of the window to access.
 * @param windowText Optional text found in the window.
 * @param controlId The control to get the position for.
 *
 * @returns A promise that resolves to the position of the control as a {@linkcode Rect} object.
 *
 * @example
 * ```typescript
 * import { ControlGetPos } from '@ahmic/autoit-js';
 *
 * const rect = await ControlGetPos('Untitled - Notepad', '', 'Edit1');
 *
 * console.log(rect); // Output: { left: 0, top: 0, right: 100, bottom: 100 }
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/ControlGetPos.htm
 */
export async function ControlGetPos(
  windowTitle: string,
  windowText: string,
  controlId: string,
): Promise<IRect> {
  const rect = new Rect();

  await autoit.invokeAsync(
    'AU3_ControlGetPos',
    INT,
    [LPCWSTR, LPCWSTR, LPCWSTR, koffi.out(LPRECT)],
    [windowTitle, windowText, controlId, rect],
  );

  return rect;
}
