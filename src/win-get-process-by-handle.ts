import { DWORD, HWND } from './@types';
import { autoit } from './lib/autoit';

/**
 * Retrieves the process ID associated with a window handle.
 *
 * @param windowHandle The handle of the window to access.
 *
 * @returns The process ID as a number.
 *
 * @example
 * ```typescript
 * import { WinGetProcessByHandle, WinGetHandle } from '@ahmic/autoit-js';
 *
 * const windowHandle = WinGetHandle('Untitled - Notepad');
 * const processId = WinGetProcessByHandle(windowHandle);
 *
 * console.log(processId); // Output: 1234
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinGetProcess.htm
 */
export function WinGetProcessByHandle(windowHandle: bigint): number {
  return autoit.invoke('AU3_WinGetProcessByHandle', DWORD, [HWND], [windowHandle]);
}
