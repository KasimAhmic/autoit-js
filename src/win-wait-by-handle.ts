import { HWND, INT } from './@types';
import { autoit } from './lib/autoit';

/**
 * Waits for a window to exist.
 *
 * @param windowHandle The handle of the window to wait for.
 * @param timeout The timeout in seconds. Default is 0 (wait indefinitely).
 *
 * @returns 1 if the window exists, 0 if the timeout is reached.
 *
 * @example
 * ```typescript
 * import { WinWaitByHandle, WinGetHandle } from '@ahmic/autoit-js';
 *
 * const handle = WinGetHandle('Untitled - Notepad');
 * WinWaitByHandle(handle, 10);
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinWait.htm
 */
export function WinWaitByHandle(windowHandle: bigint, timeout: number = 0): number {
  return autoit.invoke('AU3_WinWaitByHandle', INT, [HWND, INT], [windowHandle, timeout]);
}
