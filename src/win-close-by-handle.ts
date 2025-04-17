import { HWND, INT } from './@types';
import { autoit } from './lib/autoit';

/**
 * Closes a window.
 *
 * @param windowHandle The handle of the window to close.
 *
 * @returns 1 if successful, 0 otherwise.
 *
 * @example
 * ```typescript
 * import { WinCloseByHandle, WinGetHandle } from '@ahmic/autoit-js';
 *
 * const handle = WinGetHandle('Untitled - Notepad');
 * WinCloseByHandle(handle);
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinClose.htm
 */
export function WinCloseByHandle(windowHandle: bigint): number {
  return autoit.invoke('AU3_WinCloseByHandle', INT, [HWND], [windowHandle]);
}
