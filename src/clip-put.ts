import { LPCWSTR, VOID } from './@types';
import { autoit } from './lib/autoit';

/**
 * Writes text to the clipboard.
 *
 * @param value The text to put in the clipboard.
 *
 * @example
 * ```typescript
 * import { ClipPutSync, ClipGetSync } from '@ahmic/autoit-js';
 *
 * ClipPutSync('Hello');
 *
 * console.log(ClipGetSync()); // Outputs: Hello
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/ClipPut.htm
 */
export function ClipPutSync(value: string): void {
  return autoit.invoke('AU3_ClipPut', VOID, [LPCWSTR], [value]);
}

/**
 * Writes text to the clipboard.
 *
 * @param value The text to put in the clipboard.
 *
 * @example
 * ```typescript
 * import { ClipPut, ClipGet } from '@ahmic/autoit-js';
 *
 * ClipPut('Hello');
 *
 * console.log(ClipGet()); // Outputs: Hello
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/ClipPut.htm
 */
export function ClipPut(value: string): Promise<void> {
  return autoit.invokeAsync('AU3_ClipPut', VOID, [LPCWSTR], [value]);
}
