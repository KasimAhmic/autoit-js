import { INT, VOID } from './@types';
import { autoit } from './lib/autoit';

/**
 * Pauses the script execution for a specified amount of time.
 *
 * @param milliseconds The number of milliseconds to pause.
 *
 * @example
 * ```typescript
 * import { SleepSync } from '@ahmic/autoit-js';
 *
 * SleepSync(1000); // Pauses for 1 second
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/Sleep.htm
 */
export function SleepSync(milliseconds: number): void {
  return autoit.invoke('AU3_Sleep', VOID, [INT], [milliseconds]);
}

/**
 * Pauses the script execution for a specified amount of time.
 *
 * @param milliseconds The number of milliseconds to pause.
 *
 * @example
 * ```typescript
 * import { Sleep } from '@ahmic/autoit-js';
 *
 * await Sleep(1000); // Pauses for 1 second
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/Sleep.htm
 */
export function Sleep(milliseconds: number): Promise<void> {
  return autoit.invokeAsync('AU3_Sleep', VOID, [INT], [milliseconds]);
}
