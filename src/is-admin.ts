import { INT } from './@types';
import { autoit } from './lib/autoit';

/**
 * Checks if the current user has administrative privileges.
 *
 * @returns `true` if the user has administrative privileges, `false` otherwise.
 *
 * @example
 * ```typescript
 * import { IsAdmin } from '@ahmic/autoit-js';
 *
 * const isAdmin = IsAdmin();
 *
 * console.log(isAdmin); // Output: true
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/IsAdmin.htm
 */
export function IsAdmin(): boolean {
  return autoit.invoke('AU3_IsAdmin', INT, [], []) === 1;
}
