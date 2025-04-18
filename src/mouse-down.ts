import { LPCWSTR, VOID } from './@types';
import { autoit } from './lib/autoit';
import { MouseButton } from './mouse-click';

/**
 * Simulates holding down a mouse button.
 *
 * @param button The mouse button to hold down. See {@linkcode MouseButton} for details.
 *
 * @example
 * ```typescript
 * import { MouseDown } from '@ahmic/autoit-js';
 *
 * MouseDown('left');
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/MouseDown.htm
 */
export function MouseDown(button: MouseButton = MouseButton.Left): void {
  return autoit.invoke('AU3_MouseDown', VOID, [LPCWSTR], [button]);
}
