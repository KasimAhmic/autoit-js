import { INT, LPCWSTR } from './@types';
import { autoit } from './lib/autoit';

/**
 * Waits for a window to exist.
 *
 * @param windowTitle The title of the window to wait for.
 * @param windowText Optional text found in the window.
 * @param timeout The timeout in seconds. Default is 0 (wait indefinitely).
 *
 * @returns 1 if the window exists, 0 if the timeout is reached.
 *
 * @example
 * ```typescript
 * import { WinWaitSync } from '@ahmic/autoit-js';
 *
 * WinWaitSync('Untitled - Notepad', '', 10);
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinWait.htm
 */
export function WinWaitSync(windowTitle: string, windowText: string = '', timeout: number = 0): number {
  return autoit.invoke('AU3_WinWait', INT, [LPCWSTR, LPCWSTR, INT], [windowTitle, windowText, timeout]);
}

/**
 * Waits for a window to exist.
 *
 * @param windowTitle The title of the window to wait for.
 * @param windowText Optional text found in the window.
 * @param timeout The timeout in seconds. Default is 0 (wait indefinitely).
 *
 * @returns A promise that resolves to 1 if the window exists, 0 if the timeout is reached.
 *
 * @example
 * ```typescript
 * import { WinWait } from '@ahmic/autoit-js';
 *
 * await WinWait('Untitled - Notepad', '', 10);
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinWait.htm
 */
export function WinWait(windowTitle: string, windowText: string = '', timeout: number = 0): Promise<number> {
  return autoit.invokeAsync('AU3_WinWait', INT, [LPCWSTR, LPCWSTR, INT], [windowTitle, windowText, timeout]);
}
