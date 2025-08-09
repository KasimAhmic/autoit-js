import { INT, LPCWSTR } from './@types';
import { autoit } from './lib/autoit';

/**
 * Closes a window.
 *
 * @param windowTitle The title of the window to close.
 * @param windowText Optional text found in the window.
 *
 * @returns 1 if successful, 0 otherwise.
 *
 * @example
 * ```typescript
 * import { WinCloseSync } from '@ahmic/autoit-js';
 *
 * WinCloseSync('Untitled - Notepad');
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinClose.htm
 */
export function WinCloseSync(windowTitle: string, windowText: string = ''): number {
  return autoit.invoke('AU3_WinClose', INT, [LPCWSTR, LPCWSTR], [windowTitle, windowText]);
}

/**
 * Closes a window.
 *
 * @param windowTitle The title of the window to close.
 * @param windowText Optional text found in the window.
 *
 * @returns A promise that resolves to 1 if successful, or 0 otherwise.
 *
 * @example
 * ```typescript
 * import { WinClose } from '@ahmic/autoit-js';
 *
 * await WinClose('Untitled - Notepad');
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinClose.htm
 */
export function WinClose(windowTitle: string, windowText: string = ''): Promise<number> {
  return autoit.invokeAsync('AU3_WinClose', INT, [LPCWSTR, LPCWSTR], [windowTitle, windowText]);
}
