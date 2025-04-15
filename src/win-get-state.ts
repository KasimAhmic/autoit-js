import { INT, LPCWSTR } from './@types';
import { autoit } from './lib/autoit';

export enum WindowProperty {
  Exists = 1,
  Visible = 2,
  Enabled = 4,
  Active = 8,
  Minimized = 16,
  Maximized = 32,
}

export type WindowState = {
  /**
   * Indicates if the window exists.
   */
  exists: boolean;

  /**
   * Indicates if the window is visible.
   */
  visible: boolean;

  /**
   * Indicates if the window is enabled.
   */
  enabled: boolean;

  /**
   * Indicates if the window is active.
   */
  active: boolean;

  /**
   * Indicates if the window is minimized.
   */
  minimized: boolean;

  /**
   * Indicates if the window is maximized.
   */
  maximized: boolean;
};

/**
 * Returns the state of a window. Searches for the window by its title, and the text found within the window.
 * Though the original AutoIt function returns a bitmask, this function returns an object with boolean
 * properties for each state for ease of use.
 *
 * @param windowTitle The title of the window to check.
 * @param windowText The text of the window to check.
 *
 * @returns An object containing the state of the window.
 *
 * @example
 * ```typescript
 * import { WinGetState } from '@ahmic/autoit-js';
 *
 * const state = WinGetState('Untitled - Notepad');
 *
 * console.log(state.exists); // true if the window exists
 * console.log(state.visible); // true if the window is visible
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/func/WinGetState.htm
 */
export function WinGetState(windowTitle: string, windowText: string = ''): WindowState {
  const state = autoit.invoke('AU3_WinGetState', INT, [LPCWSTR, LPCWSTR], [windowTitle, windowText]);

  return {
    exists: (state & WindowProperty.Exists) === WindowProperty.Exists,
    visible: (state & WindowProperty.Visible) === WindowProperty.Visible,
    enabled: (state & WindowProperty.Enabled) === WindowProperty.Enabled,
    active: (state & WindowProperty.Active) === WindowProperty.Active,
    minimized: (state & WindowProperty.Minimized) === WindowProperty.Minimized,
    maximized: (state & WindowProperty.Maximized) === WindowProperty.Maximized,
  };
}
