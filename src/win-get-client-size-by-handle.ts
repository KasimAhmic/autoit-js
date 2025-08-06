import koffi from 'koffi';

import { HWND, INT, IRect, LPRECT, Rect } from './@types';
import { autoit } from './lib/autoit';

/**
 * Retrieves the client area dimensions of a window.
 *
 * @param windowHandle The handle of the window to access.
 *
 * @returns An {@linkcode IRect} object containing the width and height of the client area.
 *
 * @example
 * ```typescript
 * import { WinGetClientSizeByHandleSync, WinGetHandleSync } from '@ahmic/autoit-js';
 *
 * const windowHandle = WinGetHandleSync('Untitled - Notepad');
 * const clientSize = WinGetClientSizeByHandleSync(windowHandle);
 *
 * console.log(clientSize); // Output: { width: 800, height: 600 }
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinGetClientSize.htm
 */
export function WinGetClientSizeByHandleSync(windowHandle: bigint): Rect {
  const rect = new Rect();

  autoit.invoke('AU3_WinGetClientSizeByHandle', INT, [HWND, koffi.out(LPRECT)], [windowHandle, rect]);

  return rect;
}

/**
 * Retrieves the client area dimensions of a window.
 *
 * @param windowHandle The handle of the window to access.
 *
 * @returns A promise that resolves to an {@linkcode IRect} object containing the width and height of the
 * client area.
 *
 * @example
 * ```typescript
 * import { WinGetClientSizeByHandle, WinGetHandle } from '@ahmic/autoit-js';
 *
 * const windowHandle = await WinGetHandle('Untitled - Notepad');
 * const clientSize = await WinGetClientSizeByHandle(windowHandle);
 *
 * console.log(clientSize); // Output: { width: 800, height: 600 }
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinGetClientSize.htm
 */
export async function WinGetClientSizeByHandle(windowHandle: bigint): Promise<IRect> {
  const rect = new Rect();

  await autoit.invokeAsync(
    'AU3_WinGetClientSizeByHandle',
    INT,
    [HWND, koffi.out(LPRECT)],
    [windowHandle, rect],
  );

  return rect;
}
