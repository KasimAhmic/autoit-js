import { INT, LPCWSTR } from './@types';
import { autoit } from './lib/autoit';

/**
 * Forces a window to close.
 *
 * @param windowTitle The title of the window to close.
 * @param windowText Optional text found in the window.
 *
 * @returns 1 if successful, 0 otherwise.
 *
 * @example
 * ```typescript
 * import { WinKillSync } from '@ahmic/autoit-js';
 *
 * WinKillSync('Untitled - Notepad');
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinKill.htm
 */
export function WinKillSync(windowTitle: string, windowText: string = ''): number {
  return autoit.invoke('AU3_WinKill', INT, [LPCWSTR, LPCWSTR], [windowTitle, windowText]);
}

/**
 * Forces a window to close.
 *
 * @param windowTitle The title of the window to close.
 * @param windowText Optional text found in the window.
 *
 * @returns A promise that resolves to 1 if successful, or 0 otherwise.
 *
 * @example
 * ```typescript
 * import { WinKill } from '@ahmic/autoit-js';
 *
 * await WinKill('Untitled - Notepad');
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinKill.htm
 */
export function WinKill(windowTitle: string, windowText: string = ''): Promise<number> {
  return autoit.invokeAsync('AU3_WinKill', INT, [LPCWSTR, LPCWSTR], [windowTitle, windowText]);
}
