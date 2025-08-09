import { INT } from './@types';
import { autoit } from './lib/autoit';

/**
 * Retrieves the error code set by the last AutoIt function call.
 *
 * @returns The error code.
 *
 * @example
 * ```typescript
 * import { errorSync } from '@ahmic/autoit-js';
 *
 * const result = errorSync();
 *
 * console.log(result); // Output: 1 (example output, actual value depends on the last AutoIt function call)
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/SetError.htm
 */
export function errorSync(): number {
  return autoit.invoke('AU3_error', INT, [], []);
}

/**
 * Retrieves the error code set by the last AutoIt function call.
 *
 * @returns A promise that resolves to the error code.
 *
 * @example
 * ```typescript
 * import { error } from '@ahmic/autoit-js';
 *
 * const result = await error();
 *
 * console.log(result); // Output: 1 (example output, actual value depends on the last AutoIt function call)
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/SetError.htm
 */
export function error(): Promise<number> {
  return autoit.invokeAsync('AU3_error', INT, [], []);
}
