import { LPCWSTR, VOID } from './@types';
import { autoit } from './lib/autoit';

/**
 * Writes text to the clipboard.
 *
 * @param value The text to put in the clipboard.
 *
 * @returns The text from the clipboard.
 *
 * @example
 * ```typescript
 * import { ClipPut, ClipGet } from '@ahmic/autoit-js';
 *
 * ClipPut('Hello');
 *
 * console.log(ClipGet()); // Hello
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/ClipPut.htm
 */
export function ClipPut(value: string): void {
  return autoit.invoke('AU3_ClipPut', VOID, [LPCWSTR], [value]);
}
