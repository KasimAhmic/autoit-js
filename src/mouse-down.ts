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
 * import { MouseDownSync, MouseButton } from '@ahmic/autoit-js';
 *
 * MouseDownSync(MouseButton.Left);
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/MouseDown.htm
 */
export function MouseDownSync(button: MouseButton = MouseButton.Left): void {
  return autoit.invoke('AU3_MouseDown', VOID, [LPCWSTR], [button]);
}

/**
 * Simulates holding down a mouse button.
 *
 * @param button The mouse button to hold down. See {@linkcode MouseButton} for details.
 *
 * @example
 * ```typescript
 * import { MouseDown, MouseButton } from '@ahmic/autoit-js';
 *
 * await MouseDown(MouseButton.Left);
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/MouseDown.htm
 */
export function MouseDown(button: MouseButton = MouseButton.Left): Promise<void> {
  return autoit.invokeAsync('AU3_MouseDown', VOID, [LPCWSTR], [button]);
}
