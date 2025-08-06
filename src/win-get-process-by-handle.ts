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
 * import { WinGetProcessByHandleSync, WinGetHandleSync } from '@ahmic/autoit-js';
 *
 * const windowHandle = WinGetHandleSync('Untitled - Notepad');
 * const processId = WinGetProcessByHandleSync(windowHandle);
 *
 * console.log(processId); // Output: 1234
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinGetProcess.htm
 */
export function WinGetProcessByHandleSync(windowHandle: bigint): number {
  return autoit.invoke('AU3_WinGetProcessByHandle', DWORD, [HWND], [windowHandle]);
}

/**
 * Retrieves the process ID associated with a window handle.
 *
 * @param windowHandle The handle of the window to access.
 *
 * @returns A promise that resolves to the process ID as a number.
 *
 * @example
 * ```typescript
 * import { WinGetProcessByHandle, WinGetHandle } from '@ahmic/autoit-js';
 *
 * const windowHandle = await WinGetHandle('Untitled - Notepad');
 * const processId = await WinGetProcessByHandle(windowHandle);
 *
 * console.log(processId); // Output: 1234
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinGetProcess.htm
 */
export function WinGetProcessByHandle(windowHandle: bigint): Promise<number> {
  return autoit.invokeAsync('AU3_WinGetProcessByHandle', DWORD, [HWND], [windowHandle]);
}
