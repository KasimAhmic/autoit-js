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
 * import { MouseUp } from '@ahmic/autoit-js';
 *
 * MouseUp('left');
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/MouseUp.htm
 */
export function MouseUp(button: MouseButton = MouseButton.Left): void {
  return autoit.invoke('AU3_MouseUp', VOID, [LPCWSTR], [button]);
}
