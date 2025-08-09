import { INT } from './@types';
import { autoit } from './lib/autoit';

/**
 * Checks if the current user has administrative privileges.
 *
 * @returns `true` if the user has administrative privileges, `false` otherwise.
 *
 * @example
 * ```typescript
 * import { IsAdminSync } from '@ahmic/autoit-js';
 *
 * const isAdmin = IsAdminSync();
 *
 * console.log(isAdmin); // Output: true
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/IsAdmin.htm
 */
export function IsAdminSync(): boolean {
  return autoit.invoke('AU3_IsAdmin', INT, [], []) === 1;
}

/**
 * Checks if the current user has administrative privileges.
 *
 * @returns A promise that resolves to `true` if the user has administrative privileges, `false` otherwise.
 *
 * @example
 * ```typescript
 * import { IsAdmin } from '@ahmic/autoit-js';
 *
 * const isAdmin = await IsAdmin();
 *
 * console.log(isAdmin); // Output: true
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/IsAdmin.htm
 */
export async function IsAdmin(): Promise<boolean> {
  const isAdmin = await autoit.invokeAsync('AU3_IsAdmin', INT, [], []);

  return isAdmin === 1;
}
