import { HWND, INT } from './@types';
import { autoit } from './lib/autoit';

/**
 * Activates a window.
 *
 * @param windowHandle The handle of the window to activate.
 *
 * @returns 1 if successful, 0 otherwise.
 *
 * @example
 * ```typescript
 * import { WinActivateByHandle, WinGetHandle } from '@ahmic/autoit-js';
 *
 * const handle = WinGetHandle('Untitled - Notepad');
 * WinActivateByHandle(handle);
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinActivate.htm
 */
export function WinActivateByHandle(windowHandle: bigint): number {
  return autoit.invoke('AU3_WinActivateByHandle', INT, [HWND], [windowHandle]);
}
