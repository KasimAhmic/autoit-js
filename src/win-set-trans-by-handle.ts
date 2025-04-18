import { HWND, INT } from './@types';
import { autoit } from './lib/autoit';

/**
 * Sets the transparency level of a window. 0 is fully transparent, 255 is fully opaque.
 *
 * @param windowHandle The handle of the window.
 * @param transparency The transparency level (0-255).
 *
 * @returns 1 if successful, 0 otherwise.
 *
 * @example
 * ```typescript
 * import { WinSetTransByHandle, WinGetHandle } from '@ahmic/autoit-js';
 *
 * const windowHandle = WinGetHandle('Untitled - Notepad');
 *
 * WinSetTransByHandle(windowHandle, 128);
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinSetTrans.htm
 */
export function WinSetTransByHandle(windowHandle: bigint, transparency: number): number {
  return autoit.invoke('AU3_WinSetTransByHandle', INT, [HWND, INT], [windowHandle, transparency]);
}
