import { INT, LPCWSTR } from './@types';
import { autoit } from './lib/autoit';

/**
 * Activates a window.
 *
 * @param windowTitle The title of the window to activate.
 * @param windowText Optional text found in the window.
 *
 * @returns 1 if successful, 0 otherwise.
 *
 * @example
 * ```typescript
 * import { WinActivate } from '@ahmic/autoit-js';
 *
 * WinActivate('Untitled - Notepad');
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinActivate.htm
 */
export function WinActivate(windowTitle: string, windowText: string = ''): number {
  return autoit.invoke('AU3_WinActivate', INT, [LPCWSTR, LPCWSTR], [windowTitle, windowText]);
}
