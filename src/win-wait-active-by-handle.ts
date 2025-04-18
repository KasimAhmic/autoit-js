import { HWND, INT } from './@types';
import { autoit } from './lib/autoit';

/**
 * Waits for a window to become active.
 *
 * @param windowHandle The handle of the window to wait for.
 * @param timeout The timeout in seconds. Defaults to 0 (wait indefinitely).
 *
 * @returns 1 if the window becomes active, 0 if the timeout is reached.
 *
 * @example
 * ```typescript
 * import { WinWaitActiveByHandle, WinGetHandle } from '@ahmic/autoit-js';
 *
 * const windowHandle = WinGetHandle('Untitled - Notepad');
 *  WinWaitActiveByHandle(windowHandle, 10);
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinWaitActive.htm
 */
export function WinWaitActiveByHandle(windowHandle: bigint, timeout: number = 0): number {
  return autoit.invoke('AU3_WinWaitActiveByHandle', INT, [HWND, INT], [windowHandle, timeout]);
}
