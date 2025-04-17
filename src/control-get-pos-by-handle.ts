import koffi from 'koffi';

import { HWND, INT, LPRECT, Rect } from './@types';
import { autoit } from './lib/autoit';

/**
 * Gets the position of a control in a window, relative to the window itself.
 *
 * @param windowHandle The handle of the window to access.
 * @param controlHandle The handle of the control to get the position for.
 *
 * @returns The position of the control as a {@linkcode Rect} object.
 *
 * @example
 * ```typescript
 * import { ControlGetPosByHandle, ControlGetHandle, WinGetHandle } from '@ahmic/autoit-js';
 *
 * const windowHandle = WinGetHandle('Untitled - Notepad');
 * const controlHandle = ControlGetHandle(windowHandle, 'Edit1');
 *
 * const rect = ControlGetPosByHandle(windowHandle, controlHandle);
 *
 * console.log(rect); // Output: { left: 10, top: 10, right: 100, bottom: 100 }
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/ControlGetPos.htm
 */
export function ControlGetPosByHandle(windowHandle: bigint, controlHandle: bigint): Rect {
  const rect = new Rect();

  autoit.invoke(
    'AU3_ControlGetPosByHandle',
    INT,
    [HWND, HWND, koffi.out(LPRECT)],
    [windowHandle, controlHandle, rect],
  );

  return rect;
}
