import koffi from 'koffi';

import { HWND, LPCWSTR } from './@types';
import { autoit } from './lib/autoit';

/**
 * Retrieves the handle of a window.
 *
 * @param windowTitle The title of the window to access.
 * @param windowText Optional text found in the window.
 *
 * @returns The handle of the window as a bigint.
 *
 * @example
 * ```typescript
 * import { WinGetHandleSync } from '@ahmic/autoit-js';
 *
 * const handle = WinGetHandleSync('Untitled - Notepad');
 *
 * console.log(handle); // Output: 123456n
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinGetHandle.htm
 */
export function WinGetHandleSync(windowTitle: string, windowText: string = ''): bigint {
  const handleRef = autoit.invoke('AU3_WinGetHandle', HWND, [LPCWSTR, LPCWSTR], [windowTitle, windowText]);

  return koffi.address(handleRef);
}

/**
 * Retrieves the handle of a window.
 *
 * @param windowTitle The title of the window to access.
 * @param windowText Optional text found in the window.
 *
 * @returns A promise that resolves to the handle of the window as a bigint.
 *
 * @example
 * ```typescript
 * import { WinGetHandle } from '@ahmic/autoit-js';
 *
 * const handle = await WinGetHandle('Untitled - Notepad');
 *
 * console.log(handle); // Output: 123456n
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinGetHandle.htm
 */
export async function WinGetHandle(windowTitle: string, windowText: string = ''): Promise<bigint> {
  const handleRef = await autoit.invokeAsync(
    'AU3_WinGetHandle',
    HWND,
    [LPCWSTR, LPCWSTR],
    [windowTitle, windowText],
  );

  return koffi.address(handleRef);
}
