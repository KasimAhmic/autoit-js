import { INT, LPCWSTR } from './@types';
import { autoit } from './lib/autoit';

/**
 * Waits for a window to close.
 *
 * @param windowTitle The title of the window to wait for.
 * @param windowText Optional text found in the window.
 * @param timeout The timeout in seconds. Default is 0 (wait indefinitely).
 *
 * @returns 1 if the window closes, 0 if the timeout is reached.
 *
 * @example
 * ```typescript
 * import { WinWaitClose } from '@ahmic/autoit-js';
 *
 * WinWaitClose('Untitled - Notepad', '', 10);
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinWaitClose.htm
 */
export function WinWaitClose(windowTitle: string, windowText: string = '', timeout: number = 0): number {
  return autoit.invoke('AU3_WinWaitClose', INT, [LPCWSTR, LPCWSTR, INT], [windowTitle, windowText, timeout]);
}
