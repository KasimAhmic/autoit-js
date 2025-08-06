import { HWND, INT } from './@types';
import { autoit } from './lib/autoit';
import { WindowProperty, WindowState } from './win-get-state';

/**
 * Returns the state of a window.
 *
 * Though the original AutoIt function returns a bitmask, this function returns an object with boolean
 * properties for each state for ease of use.
 *
 * @param windowHandle The handle of the window to check.
 *
 * @returns A {@linkcode WindowState} object containing the state of the window.
 *
 * @example
 * ```typescript
 * import { WinGetStateByHandleSync, WinGetHandleSync } from '@ahmic/autoit-js';
 *
 * const windowHandle = WinGetHandleSync('Untitled - Notepad');
 * const state = WinGetStateByHandleSync(windowHandle);
 *
 * console.log(state.exists); // true if the window exists
 * console.log(state.visible); // true if the window is visible
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/func/WinGetState.htm
 */
export function WinGetStateByHandleSync(windowHandle: bigint): WindowState {
  const state = autoit.invoke('AU3_WinGetStateByHandle', INT, [HWND], [windowHandle]);

  return {
    exists: (state & WindowProperty.Exists) === WindowProperty.Exists,
    visible: (state & WindowProperty.Visible) === WindowProperty.Visible,
    enabled: (state & WindowProperty.Enabled) === WindowProperty.Enabled,
    active: (state & WindowProperty.Active) === WindowProperty.Active,
    minimized: (state & WindowProperty.Minimized) === WindowProperty.Minimized,
    maximized: (state & WindowProperty.Maximized) === WindowProperty.Maximized,
  };
}

/**
 * Returns the state of a window.
 *
 * Though the original AutoIt function returns a bitmask, this function returns an object with boolean
 * properties for each state for ease of use.
 *
 * @param windowHandle The handle of the window to check.
 *
 * @returns A promise that resolves to a {@linkcode WindowState} object containing the state of the window.
 *
 * @example
 * ```typescript
 * import { WinGetStateByHandle, WinGetHandle } from '@ahmic/autoit-js';
 *
 * const windowHandle = await WinGetHandle('Untitled - Notepad');
 * const state = await WinGetStateByHandle(windowHandle);
 *
 * console.log(state.exists); // true if the window exists
 * console.log(state.visible); // true if the window is visible
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/func/WinGetState.htm
 */
export async function WinGetStateByHandle(windowHandle: bigint): Promise<WindowState> {
  const state = await autoit.invokeAsync('AU3_WinGetStateByHandle', INT, [HWND], [windowHandle]);

  return {
    exists: (state & WindowProperty.Exists) === WindowProperty.Exists,
    visible: (state & WindowProperty.Visible) === WindowProperty.Visible,
    enabled: (state & WindowProperty.Enabled) === WindowProperty.Enabled,
    active: (state & WindowProperty.Active) === WindowProperty.Active,
    minimized: (state & WindowProperty.Minimized) === WindowProperty.Minimized,
    maximized: (state & WindowProperty.Maximized) === WindowProperty.Maximized,
  };
}
