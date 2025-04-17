import { HWND, INT } from './@types';
import { autoit } from './lib/autoit';

/**
 * Waits for a window to close.
 *
 * @param windowHandle The handle of the window to wait for.
 * @param timeout The timeout in seconds. Default is 0 (wait indefinitely).
 *
 * @returns 1 if the window closes, 0 if the timeout is reached.
 *
 * @example
 * ```typescript
 * import { WinWaitCloseByHandle, WinGetHandle } from '@ahmic/autoit-js';
 *
 * const handle = WinGetHandle('Untitled - Notepad');
 * WinWaitCloseByHandle(handle, 10);
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinWaitClose.htm
 */
export function WinWaitCloseByHandle(windowHandle: bigint, timeout: number = 0): number {
  return autoit.invoke('AU3_WinWaitCloseByHandle', INT, [HWND, INT], [windowHandle, timeout]);
}
