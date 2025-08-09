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
 * import { WinWaitNotActiveByHandleSync, WinGetHandleSync } from '@ahmic/autoit-js';
 *
 * const windowHandle = WinGetHandleSync('Untitled - Notepad');
 *
 * WinWaitNotActiveByHandleSync(windowHandle, 10);
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinWaitNotActive.htm
 */
export function WinWaitNotActiveByHandleSync(windowHandle: bigint, timeout: number = 0): number {
  return autoit.invoke('AU3_WinWaitNotActiveByHandle', INT, [HWND, INT], [windowHandle, timeout]);
}

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
 * const windowHandle = await WinGetHandle('Untitled - Notepad');
 *
 * await WinWaitNotActiveByHandle(windowHandle, 10);
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinWaitNotActive.htm
 */
export function WinWaitNotActiveByHandle(windowHandle: bigint, timeout: number = 0): Promise<number> {
  return autoit.invokeAsync('AU3_WinWaitNotActiveByHandle', INT, [HWND, INT], [windowHandle, timeout]);
}
