import { INT, LPCWSTR } from './@types';
import { autoit } from './lib/autoit';
import { MouseButton } from './mouse-click';

/**
 * Drags the mouse from a start position to an end position.
 *
 * @param button The mouse button to use. See {@linkcode MouseButton} for details.
 * @param startX The starting X coordinate.
 * @param startY The starting Y coordinate.
 * @param endX The ending X coordinate.
 * @param endY The ending Y coordinate.
 * @param speed The speed of the drag (1 is fast, 100 is slow).
 *
 * @returns 1 if successful, 0 otherwise.
 *
 * @example
 * ```typescript
 * import { MouseClickDragSync, MouseButton } from '@ahmic/autoit-js';
 *
 * MouseClickDragSync(MouseButton.Left, 100, 100, 200, 200, 10);
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/MouseClickDrag.htm
 */
export function MouseClickDragSync(
  button: MouseButton,
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  speed: number = -1,
): number {
  return autoit.invoke(
    'AU3_MouseClickDrag',
    INT,
    [LPCWSTR, INT, INT, INT, INT, INT],
    [button, startX, startY, endX, endY, speed],
  );
}

/**
 * Drags the mouse from a start position to an end position.
 *
 * @param button The mouse button to use. See {@linkcode MouseButton} for details.
 * @param startX The starting X coordinate.
 * @param startY The starting Y coordinate.
 * @param endX The ending X coordinate.
 * @param endY The ending Y coordinate.
 * @param speed The speed of the drag (1 is fast, 100 is slow).
 *
 * @returns A promise that resolves to 1 if successful, or 0 otherwise.
 *
 * @example
 * ```typescript
 * import { MouseClickDrag, MouseButton } from '@ahmic/autoit-js';
 *
 * await MouseClickDrag(MouseButton.Left, 100, 100, 200, 200, 10);
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/MouseClickDrag.htm
 */
export function MouseClickDrag(
  button: MouseButton,
  startX: number,
  startY: number,
  endX: number,
  endY: number,
  speed: number = -1,
): Promise<number> {
  return autoit.invokeAsync(
    'AU3_MouseClickDrag',
    INT,
    [LPCWSTR, INT, INT, INT, INT, INT],
    [button, startX, startY, endX, endY, speed],
  );
}
