import { INT, LPCWSTR } from './@types';
import { autoit } from './lib/autoit';

/**
 * Enumeration for window properties.
 */
export enum WindowProperty {
  /** Indicates if the window exists. */
  Exists = 1,

  /** Indicates if the window is visible. */
  Visible = 2,

  /** Indicates if the window is enabled. */
  Enabled = 4,

  /** Indicates if the window is active. */
  Active = 8,

  /** Indicates if the window is minimized. */
  Minimized = 16,

  /** Indicates if the window is maximized. */
  Maximized = 32,
}

/**
 * The decoded state of a window.
 */
export type WindowState = {
  /** Indicates if the window exists. */
  exists: boolean;

  /** Indicates if the window is visible. */
  visible: boolean;

  /** Indicates if the window is enabled. */
  enabled: boolean;

  /** Indicates if the window is active. */
  active: boolean;

  /** Indicates if the window is minimized. */
  minimized: boolean;

  /** Indicates if the window is maximized. */
  maximized: boolean;
};

/**
 * Returns the state of a window.
 *
 * Though the original AutoIt function returns a bitmask, this function returns an object with boolean
 * properties for each state for ease of use.
 *
 * @param windowTitle The title of the window to check.
 * @param windowText Optional text found in the window.
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
