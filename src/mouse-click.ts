import { AU3_INTDEFAULT, INT, LPCWSTR } from './@types';
import { autoit } from './lib/autoit';

/**
 * Enumeration of mouse buttons.
 */
export enum MouseButton {
  /** Left mouse button */
  Left = 'left',

  /** Middle mouse button (scroll wheel) */
  Middle = 'middle',

  /** Right mouse button */
  Right = 'right',

  /** The user configured primary mouse button (can be left or right) */
  Primary = 'primary',

  /** The user configured primary mouse button (can be left or right) */
  Main = 'main',

  /** The user configured secondary mouse button (can be left or right) */
  Secondary = 'secondary',

  /** The user configured secondary mouse button (can be left or right) */
  Menu = 'menu',
}

/**
 * Simulates a mouse click at the specified coordinates.
 *
 * @param button The mouse button to click. See {@linkcode MouseButton} for details.
 * @param x The X coordinate to click at.
 * @param y The Y coordinate to click at.
 * @param clicks The number of times to click.
 * @param speed The speed of the click (1 is fast, 100 is slow).
 *
 * @example
 * ```typescript
 * import { MouseClick } from '@ahmic/autoit-js';
 *
 * MouseClick('left', 150, 150, 2, 10);
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/MouseClick.htm
 */
export function MouseClick(
  button: MouseButton = MouseButton.Left,
  x: number = AU3_INTDEFAULT,
  y: number = AU3_INTDEFAULT,
  clicks: number = 1,
  speed: number = -1,
): number {
  return autoit.invoke('AU3_MouseClick', INT, [LPCWSTR, INT, INT, INT, INT], [button, x, y, clicks, speed]);
}
