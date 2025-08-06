import { INT, LPCWSTR } from './@types';
import { autoit } from './lib/autoit';

/**
 * Waits for a window to become inactive.
 *
 * @param windowTitle The title of the window to wait for.
 * @param windowText Optional text found in the window.
 * @param timeout The timeout in seconds. Defaults to 0 (wait indefinitely).
 *
 * @returns 1 if the window becomes inactive, 0 if the timeout is reached.
 *
 * @example
 * ```typescript
 * import { WinWaitNotActiveSync } from '@ahmic/autoit-js';
 *
 * WinWaitNotActiveSync('Untitled - Notepad', '', 10);
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinWaitNotActive.htm
 */
export function WinWaitNotActiveSync(
  windowTitle: string,
  windowText: string = '',
  timeout: number = 0,
): number {
  return autoit.invoke(
    'AU3_WinWaitNotActive',
    INT,
    [LPCWSTR, LPCWSTR, INT],
    [windowTitle, windowText, timeout],
  );
}

/**
 * Waits for a window to become inactive.
 *
 * @param windowTitle The title of the window to wait for.
 * @param windowText Optional text found in the window.
 * @param timeout The timeout in seconds. Defaults to 0 (wait indefinitely).
 *
 * @returns A promise that resolves to 1 if the window becomes inactive, 0 if the timeout is reached.
 *
 * @example
 * ```typescript
 * import { WinWaitNotActive } from '@ahmic/autoit-js';
 *
 * await WinWaitNotActive('Untitled - Notepad', '', 10);
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinWaitNotActive.htm
 */
export function WinWaitNotActive(
  windowTitle: string,
  windowText: string = '',
  timeout: number = 0,
): Promise<number> {
  return autoit.invokeAsync(
    'AU3_WinWaitNotActive',
    INT,
    [LPCWSTR, LPCWSTR, INT],
    [windowTitle, windowText, timeout],
  );
}
