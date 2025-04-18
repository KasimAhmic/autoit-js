import { INT, LPCWSTR } from './@types';
import { autoit } from './lib/autoit';

/**
 * Changes the title of a window.
 *
 * @param windowTitle The title of the window to modify.
 * @param windowText Optional text found in the window.
 * @param newTitle The new title to set for the window.
 *
 * @returns 1 if successful, 0 otherwise.
 *
 * @example
 * ```typescript
 * import { WinSetTitle } from '@ahmic/autoit-js';
 *
 * WinSetTitle('Untitled - Notepad', '', 'New Title');
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinSetTitle.htm
 */
export function WinSetTitle(windowTitle: string, windowText: string = '', newTitle: string): number {
  return autoit.invoke(
    'AU3_WinSetTitle',
    INT,
    [LPCWSTR, LPCWSTR, LPCWSTR],
    [windowTitle, windowText, newTitle],
  );
}
