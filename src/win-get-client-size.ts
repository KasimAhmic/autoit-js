import koffi from 'koffi';

import { INT, IRect, LPCWSTR, LPRECT, Rect } from './@types';
import { autoit } from './lib/autoit';

/**
 * Retrieves the client area dimensions of a window.
 *
 * @param windowTitle The title of the window to access.
 * @param windowText Optional text found in the window.
 *
 * @returns An {@linkcode IRect} object containing the width and height of the client area.
 *
 * @example
 * ```typescript
 * import { WinGetClientSizeSync } from '@ahmic/autoit-js';
 *
 * const clientSize = WinGetClientSizeSync('Untitled - Notepad');
 *
 * console.log(clientSize); // Output: { width: 800, height: 600 }
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinGetClientSize.htm
 */
export function WinGetClientSizeSync(windowTitle: string, windowText: string = ''): IRect {
  const rect = new Rect();

  autoit.invoke(
    'AU3_WinGetClientSize',
    INT,
    [LPCWSTR, LPCWSTR, koffi.out(LPRECT)],
    [windowTitle, windowText, rect],
  );

  return rect;
}

/**
 * Retrieves the client area dimensions of a window.
 *
 * @param windowTitle The title of the window to access.
 * @param windowText Optional text found in the window.
 *
 * @returns A promise that resolves to an {@linkcode IRect} object containing the width and height of the
 * client area.
 *
 * @example
 * ```typescript
 * import { WinGetClientSize } from '@ahmic/autoit-js';
 *
 * const clientSize = await WinGetClientSize('Untitled - Notepad');
 *
 * console.log(clientSize); // Output: { width: 800, height: 600 }
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinGetClientSize.htm
 */
export async function WinGetClientSize(windowTitle: string, windowText: string = ''): Promise<IRect> {
  const rect = new Rect();

  await autoit.invokeAsync(
    'AU3_WinGetClientSize',
    INT,
    [LPCWSTR, LPCWSTR, koffi.out(LPRECT)],
    [windowTitle, windowText, rect],
  );

  return rect;
}
