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
 * import { WinWaitActiveByHandleSync, WinGetHandleSync } from '@ahmic/autoit-js';
 *
 * const windowHandle = WinGetHandleSync('Untitled - Notepad');
 *  WinWaitActiveByHandleSync(windowHandle, 10);
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinWaitActive.htm
 */
export function WinWaitActiveByHandleSync(windowHandle: bigint, timeout: number = 0): number {
  return autoit.invoke('AU3_WinWaitActiveByHandle', INT, [HWND, INT], [windowHandle, timeout]);
}

/**
 * Waits for a window to become active.
 *
 * @param windowHandle The handle of the window to wait for.
 * @param timeout The timeout in seconds. Defaults to 0 (wait indefinitely).
 *
 * @returns A promise that resolves to 1 if the window becomes active, or 0 if the timeout is reached.
 *
 * @example
 * ```typescript
 * import { WinWaitActiveByHandle, WinGetHandle } from '@ahmic/autoit-js';
 *
 * const windowHandle = await WinGetHandle('Untitled - Notepad');
 * await WinWaitActiveByHandle(windowHandle, 10);
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinWaitActive.htm
 */
export function WinWaitActiveByHandle(windowHandle: bigint, timeout: number = 0): Promise<number> {
  return autoit.invokeAsync('AU3_WinWaitActiveByHandle', INT, [HWND, INT], [windowHandle, timeout]);
}
