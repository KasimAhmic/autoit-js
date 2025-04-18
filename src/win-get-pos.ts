import koffi from 'koffi';

import { INT, IRect, LPCWSTR, LPRECT, Rect } from './@types';
import { autoit } from './lib/autoit';

/**
 * Retrieves the position and size of a window.
 *
 * @param windowTitle The title of the window.
 * @param windowText Optional text found in the window.
 *
 * @returns The position and size of the window as a {@linkcode IRect} object.
 *
 * @example
 * ```typescript
 * import { WinGetPos } from '@ahmic/autoit-js';
 *
 * const rect = WinGetPos('Untitled - Notepad');
 *
 * console.log(rect); // Output: { left: 100, top: 100, right: 200, bottom: 200 }
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinGetPos.htm
 */
export function WinGetPos(windowTitle: string, windowText: string = ''): IRect {
  const rect = new Rect();

  autoit.invoke('AU3_WinGetPos', INT, [LPCWSTR, LPCWSTR, koffi.out(LPRECT)], [windowTitle, windowText, rect]);

  return rect;
}
