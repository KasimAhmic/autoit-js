import { HWND, INT } from './@types';
import { autoit } from './lib/autoit';

/**
 * Waits for a window to become inactive.
 *
 * @param windowHandle The handle of the window to wait for.
 * @param timeout The timeout in seconds. Defaults to 0 (wait indefinitely).
 *
 * @returns 1 if the window becomes inactive, 0 if the timeout is reached.
 *
 * @example
 * ```typescript
 * import { WinWaitNotActiveByHandle, WinGetHandle } from '@ahmic/autoit-js';
 *
 * const windowHandle = WinGetHandle('Untitled - Notepad');
 *
 * WinWaitNotActiveByHandle(windowHandle, 10);
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinWaitNotActive.htm
 */
export function WinWaitNotActiveByHandle(windowHandle: bigint, timeout: number = 0): number {
  return autoit.invoke('AU3_WinWaitNotActiveByHandle', INT, [HWND, INT], [windowHandle, timeout]);
}
