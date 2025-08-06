import { DWORD, LPCWSTR } from './@types';
import { autoit } from './lib/autoit';

/**
 * Retrieves the process ID associated with a window.
 *
 * @param windowTitle The title of the window to access.
 * @param windowText Optional text found in the window.
 *
 * @returns The process ID as a number.
 *
 * @example
 * ```typescript
 * import { WinGetProcessSync } from '@ahmic/autoit-js';
 *
 * const processId = WinGetProcessSync('Untitled - Notepad');
 *
 * console.log(processId); // Output: 1234
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinGetProcess.htm
 */
export function WinGetProcessSync(windowTitle: string, windowText: string = ''): number {
  return autoit.invoke('AU3_WinGetProcess', DWORD, [LPCWSTR, LPCWSTR], [windowTitle, windowText]);
}

/**
 * Retrieves the process ID associated with a window.
 *
 * @param windowTitle The title of the window to access.
 * @param windowText Optional text found in the window.
 *
 * @returns A promise that resolves to the process ID as a number.
 *
 * @example
 * ```typescript
 * import { WinGetProcess } from '@ahmic/autoit-js';
 *
 * const processId = await WinGetProcess('Untitled - Notepad');
 *
 * console.log(processId); // Output: 1234
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinGetProcess.htm
 */
export function WinGetProcess(windowTitle: string, windowText: string = ''): Promise<number> {
  return autoit.invokeAsync('AU3_WinGetProcess', DWORD, [LPCWSTR, LPCWSTR], [windowTitle, windowText]);
}
