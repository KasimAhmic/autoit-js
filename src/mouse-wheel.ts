import { INT, LPCWSTR, VOID } from './@types';
import { autoit } from './lib/autoit';

/**
 * Enumeration for scroll directions.
 */
export enum ScrollDirection {
  /**
   * Scrolls up.
   */
  Up = 'up',

  /**
   * Scrolls down.
   */
  Down = 'down',
}

/**
 * Scrolls the mouse wheel.
 *
 * @param direction The direction to scroll (up or down).
 * @param clicks The number of clicks to scroll. Defaults to 1.
 *
 * @example
 * ```typescript
 * import { MouseWheelSync, ScrollDirection } from '@ahmic/autoit-js';
 *
 * MouseWheelSync(ScrollDirection.Up, 3);
 * MouseWheelSync(ScrollDirection.Down, 2);
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/MouseWheel.htm
 */
export function MouseWheelSync(direction: ScrollDirection, clicks: number = 1): void {
  return autoit.invoke('AU3_MouseWheel', VOID, [LPCWSTR, INT], [direction, clicks]);
}

/**
 * Scrolls the mouse wheel.
 *
 * @param direction The direction to scroll (up or down).
 * @param clicks The number of clicks to scroll. Defaults to 1.
 *
 * @example
 * ```typescript
 * import { MouseWheel, ScrollDirection } from '@ahmic/autoit-js';
 *
 * await MouseWheel(ScrollDirection.Up, 3);
 * await MouseWheel(ScrollDirection.Down, 2);
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/MouseWheel.htm
 */
export function MouseWheel(direction: ScrollDirection, clicks: number = 1): Promise<void> {
  return autoit.invokeAsync('AU3_MouseWheel', VOID, [LPCWSTR, INT], [direction, clicks]);
}
