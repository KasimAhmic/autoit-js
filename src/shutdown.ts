import { INT } from './@types';
import { autoit } from './lib/autoit';

/**
 * Enumeration of shutdown flags.
 */
export enum ShutdownFlag {
  /** Logs the user out */
  Logoff = 0,

  /** Shuts down the system */
  Shutdown = 1,

  /** Reboots the system */
  Reboot = 2,

  /** Forces a shutdown */
  Force = 4,

  /** Forces a shutdown and closes all applications */
  PowerDown = 8,

  /** Forces a shutdown and closes all applications without warning */
  ForceHung = 16,

  /** Forces a shutdown and closes all applications without warning */
  Standby = 32,

  /** Shuts down the system and hibernates */
  Hibernate = 64,
}

/**
 * Shuts down or restarts the system based on the specified flags.
 *
 * @param flags The shutdown flags to control the behavior (e.g., Shutdown, Reboot, Hibernate).
 *
 * @returns 1 if successful, 0 otherwise.
 *
 * @example
 * ```typescript
 * import { Shutdown, ShutdownFlag } from '@ahmic/autoit-js';
 *
 * Shutdown(ShutdownFlag.Reboot);
 *
 * // Use bitwise OR to combine flags
 * Shutdown(ShutdownFlag.Shutdown | ShutdownFlag.Force);
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/Shutdown.htm
 */
export function Shutdown(flags: ShutdownFlag): number {
  return autoit.invoke('AU3_Shutdown', INT, [INT], [flags]);
}
