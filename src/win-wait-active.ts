import { INT, LPCWSTR } from './@types';
import { autoit } from './lib/autoit';

/**
 * Waits for a window to become active.
 *
 * @param windowTitle The title of the window to wait for.
 * @param windowText Optional text found in the window.
 * @param timeout The timeout in seconds. Defaults to 0 (wait indefinitely).
 *
 * @returns 1 if the window becomes active, 0 if the timeout is reached.
 *
 * @example
 * ```typescript
 * import { WinWaitActive } from '@ahmic/autoit-js';
 *
 * WinWaitActive('Untitled - Notepad', '', 10);
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinWaitActive.htm
 */
export function WinWaitActive(windowTitle: string, windowText: string = '', timeout: number = 0): number {
  return autoit.invoke('AU3_WinWaitActive', INT, [LPCWSTR, LPCWSTR, INT], [windowTitle, windowText, timeout]);
}
