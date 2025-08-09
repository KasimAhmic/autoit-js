import { HWND, INT } from './@types';
import { autoit } from './lib/autoit';
import { StateFlag } from './win-set-state';

/**
 * Changes the state of a window.
 *
 * @param windowHandle The handle of the window.
 * @param flags The state flags to apply. See {@linkcode StateFlag} for details.
 *
 * @returns 1 if successful, 0 otherwise.
 *
 * @example
 * ```typescript
 * import { WinSetStateByHandleSync, StateFlag, WinGetHandleSync } from '@ahmic/autoit-js';
 *
 * const windowHandle = WinGetHandleSync('Untitled - Notepad');
 *
 * WinSetStateByHandleSync(windowHandle, StateFlag.Minimize);
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinSetState.htm
 */
export function WinSetStateByHandleSync(windowHandle: bigint, flags: StateFlag): number {
  return autoit.invoke('AU3_WinSetStateByHandle', INT, [HWND, INT], [windowHandle, flags]);
}

/**
 * Changes the state of a window.
 *
 * @param windowHandle The handle of the window.
 * @param flags The state flags to apply. See {@linkcode StateFlag} for details.
 *
 * @returns A promise that resolves to 1 if successful, or 0 otherwise.
 *
 * @example
 * ```typescript
 * import { WinSetStateByHandle, StateFlag, WinGetHandle } from '@ahmic/autoit-js';
 *
 * const windowHandle = await WinGetHandle('Untitled - Notepad');
 *
 * await WinSetStateByHandle(windowHandle, StateFlag.Minimize);
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinSetState.htm
 */
export function WinSetStateByHandle(windowHandle: bigint, flags: StateFlag): Promise<number> {
  return autoit.invokeAsync('AU3_WinSetStateByHandle', INT, [HWND, INT], [windowHandle, flags]);
}
