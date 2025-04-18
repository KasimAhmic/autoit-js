import { INT, LPCWSTR } from './@types';
import { autoit } from './lib/autoit';

/**
 * Sets whether a window is on top of all other windows.
 *
 * @param windowTitle The title of the window to set on top.
 * @param windowText Optional text found in the window.
 * @param onTop Whether to set the window on top or not.
 *
 * @returns 1 if the operation was successful, 0 otherwise.
 *
 * @example
 * ```typescript
 * import { WinSetOnTop } from '@ahmic/autoit-js';
 *
 * WinSetOnTop('Untitled - Notepad', '', true);
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinSetOnTop.htm
 */
export function WinSetOnTop(windowTitle: string, windowText: string = '', onTop: boolean): number {
  return autoit.invoke(
    'AU3_WinSetOnTop',
    INT,
    [LPCWSTR, LPCWSTR, INT],
    [windowTitle, windowText, onTop ? 1 : 0],
  );
}
