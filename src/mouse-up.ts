import { LPCWSTR, VOID } from './@types';
import { autoit } from './lib/autoit';
import { MouseButton } from './mouse-click';

/**
 * Simulates releasing a mouse button.
 *
 * @param button The mouse button to release. See {@linkcode MouseButton} for details.
 *
 * @example
 * ```typescript
 * import { MouseUpSync, MouseButton } from '@ahmic/autoit-js';
 *
 * MouseUpSync(MouseButton.Left);
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/MouseUp.htm
 */
export function MouseUpSync(button: MouseButton = MouseButton.Left): void {
  return autoit.invoke('AU3_MouseUp', VOID, [LPCWSTR], [button]);
}

/**
 * Simulates releasing a mouse button.
 *
 * @param button The mouse button to release. See {@linkcode MouseButton} for details.
 *
 * @example
 * ```typescript
 * import { MouseUp, MouseButton } from '@ahmic/autoit-js';
 *
 * await MouseUp(MouseButton.Left);
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/MouseUp.htm
 */
export function MouseUp(button: MouseButton = MouseButton.Left): Promise<void> {
  return autoit.invokeAsync('AU3_MouseUp', VOID, [LPCWSTR], [button]);
}
