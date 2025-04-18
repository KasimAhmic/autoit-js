import { INT } from './@types';
import { autoit } from './lib/autoit';

/**
 * Retrieves the error code set by the last AutoIt function call.
 *
 * @returns The error code.
 *
 * @example
 * const result = error();
 *
 * console.log(result); // Output: 1 (example output, actual value depends on the last AutoIt function call)
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/SetError.htm
 */
export function error(): number {
  return autoit.invoke('AU3_error', INT, [], []);
}
