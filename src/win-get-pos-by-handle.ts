import koffi from 'koffi';

import { HWND, INT, IRect, LPRECT, Rect } from './@types';
import { autoit } from './lib/autoit';

/**
 * Retrieves the position and size of a window.
 *
 * @param windowHandle The handle of the window.
 *
 * @returns The position and size of the window as a {@linkcode IRect} object.
 *
 * @example
 * ```typescript
 * import { WinGetHandle, WinGetPosByHandle } from '@ahmic/autoit-js';
 *
 * const windowHandle = WinGetHandle('Untitled - Notepad');
 *
 * const rect = WinGetPosByHandle(windowHandle);
 *
 * console.log(rect); // Output: { left: 100, top: 100, right: 200, bottom: 200 }
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinGetPos.htm
 */
export function WinGetPosByHandle(windowHandle: bigint): IRect {
  const rect = new Rect();

  autoit.invoke('AU3_WinGetPosByHandle', INT, [HWND, koffi.out(LPRECT)], [windowHandle, rect]);

  return rect;
}
