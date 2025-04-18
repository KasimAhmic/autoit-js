import koffi from 'koffi';

import { HWND, INT, LPRECT, Rect } from './@types';
import { autoit } from './lib/autoit';

/**
 * Retrieves the client area dimensions of a window.
 *
 * @param windowHandle The handle of the window to access.
 *
 * @returns An object containing the width and height of the client area.
 *
 * @example
 * ```typescript
 * import { WinGetClientSizeByHandle, WinGetHandle } from '@ahmic/autoit-js';
 *
 * const windowHandle = WinGetHandle('Untitled - Notepad');
 * const clientSize = WinGetClientSizeByHandle(windowHandle);
 *
 * console.log(clientSize); // Output: { width: 800, height: 600 }
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinGetClientSize.htm
 */
export function WinGetClientSizeByHandle(windowHandle: bigint): Rect {
  const rect = new Rect();

  autoit.invoke('AU3_WinGetClientSizeByHandle', INT, [HWND, koffi.out(LPRECT)], [windowHandle, rect]);

  return rect;
}
