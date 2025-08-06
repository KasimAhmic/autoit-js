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
 * import { WinActivateSync } from '@ahmic/autoit-js';
 *
 * WinActivateSync('Untitled - Notepad');
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinActivate.htm
 */
export function WinActivateSync(windowTitle: string, windowText: string = ''): number {
  return autoit.invoke('AU3_WinActivate', INT, [LPCWSTR, LPCWSTR], [windowTitle, windowText]);
}

/**
 * Activates a window.
 *
 * @param windowTitle The title of the window to activate.
 * @param windowText Optional text found in the window.
 *
 * @returns A promise that resolves to 1 if successful, or 0 otherwise.
 *
 * @example
 * ```typescript
 * import { WinActivate } from '@ahmic/autoit-js';
 *
 * await WinActivate('Untitled - Notepad');
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinActivate.htm
 */
export function WinActivate(windowTitle: string, windowText: string = ''): Promise<number> {
  return autoit.invokeAsync('AU3_WinActivate', INT, [LPCWSTR, LPCWSTR], [windowTitle, windowText]);
}
