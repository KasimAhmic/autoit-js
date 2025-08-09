import { INT, LPCWSTR } from './@types';
import { autoit } from './lib/autoit';

/**
 * Checks if a window is currently active.
 *
 * @param windowTitle The title of the window to check.
 * @param windowText Optional text found in the window.
 *
 * @returns 1 if the window is active, 0 otherwise.
 *
 * @example
 * ```typescript
 * import { WinActiveSync } from '@ahmic/autoit-js';
 *
 * const isActive = WinActiveSync('Untitled - Notepad');
 *
 * console.log(isActive); // Output: 1
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinActive.htm
 */
export function WinActiveSync(windowTitle: string, windowText: string = ''): number {
  return autoit.invoke('AU3_WinActive', INT, [LPCWSTR, LPCWSTR], [windowTitle, windowText]);
}

/**
 * Checks if a window is currently active.
 *
 * @param windowTitle The title of the window to check.
 * @param windowText Optional text found in the window.
 *
 * @returns A promise that resolves to 1 if the window is active, or 0 otherwise.
 *
 * @example
 * ```typescript
 * import { WinActive } from '@ahmic/autoit-js';
 *
 * const isActive = await WinActive('Untitled - Notepad');
 *
 * console.log(isActive); // Output: 1
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinActive.htm
 */
export function WinActive(windowTitle: string, windowText: string = ''): Promise<number> {
  return autoit.invokeAsync('AU3_WinActive', INT, [LPCWSTR, LPCWSTR], [windowTitle, windowText]);
}
