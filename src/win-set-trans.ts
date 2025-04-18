import { INT, LPCWSTR } from './@types';
import { autoit } from './lib/autoit';

/**
 * Sets the transparency level of a window. 0 is fully transparent, 255 is fully opaque.
 *
 * @param windowTitle The title of the window.
 * @param windowText Optional text found in the window.
 * @param transparency The transparency level (0-255).
 *
 * @returns 1 if successful, 0 otherwise.
 *
 * @example
 * ```typescript
 * import { WinSetTrans } from '@ahmic/autoit-js';
 *
 * WinSetTrans('Untitled - Notepad', '', 128);
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinSetTrans.htm
 */
export function WinSetTrans(windowTitle: string, windowText: string = '', transparency: number): number {
  return autoit.invoke(
    'AU3_WinSetTrans',
    INT,
    [LPCWSTR, LPCWSTR, INT],
    [windowTitle, windowText, transparency],
  );
}
