import koffi from 'koffi';

import { HWND, INT, IRect, LPRECT, Rect } from './@types';
import { autoit } from './lib/autoit';

/**
 * Retrieves the position and size of a window.
 *
 * @param windowHandle The handle of the window.
 *
 * @returns An {@linkcode IRect} object containing the position and size of the window.
 *
 * @example
 * ```typescript
 * import { WinGetHandleSync, WinGetPosByHandleSync } from '@ahmic/autoit-js';
 *
 * const windowHandle = WinGetHandleSync('Untitled - Notepad');
 * const rect = WinGetPosByHandleSync(windowHandle);
 *
 * console.log(rect); // Output: { left: 100, top: 100, right: 200, bottom: 200 }
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinGetPos.htm
 */
export function WinGetPosByHandleSync(windowHandle: bigint): IRect {
  const rect = new Rect();

  autoit.invoke('AU3_WinGetPosByHandle', INT, [HWND, koffi.out(LPRECT)], [windowHandle, rect]);

  return rect;
}

/**
 * Retrieves the position and size of a window.
 *
 * @param windowHandle The handle of the window.
 *
 * @returns A promise that resolves to an {@linkcode IRect} object containing the position and size of the
 * window.
 *
 * @example
 * ```typescript
 * import { WinGetHandle, WinGetPosByHandle } from '@ahmic/autoit-js';
 *
 * const windowHandle = await WinGetHandle('Untitled - Notepad');
 * const rect = await WinGetPosByHandle(windowHandle);
 *
 * console.log(rect); // Output: { left: 100, top: 100, right: 200, bottom: 200 }
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinGetPos.htm
 */
export async function WinGetPosByHandle(windowHandle: bigint): Promise<IRect> {
  const rect = new Rect();

  await autoit.invokeAsync('AU3_WinGetPosByHandle', INT, [HWND, koffi.out(LPRECT)], [windowHandle, rect]);

  return rect;
}
