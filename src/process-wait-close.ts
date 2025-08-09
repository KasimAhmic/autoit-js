import { INT, LPCWSTR } from './@types';
import { autoit } from './lib/autoit';

/**
 * Waits for a process to close.
 *
 * @param process The name of the process to wait for.
 * @param timeout The timeout in seconds. Default is 0 (wait indefinitely).
 *
 * @returns 1 if the process closes, 0 if the timeout is reached.
 *
 * @example
 * ```typescript
 * import { ProcessWaitCloseSync } from '@ahmic/autoit-js';
 *
 * ProcessWaitCloseSync('notepad.exe', 10);
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/ProcessWaitClose.htm
 */
export function ProcessWaitCloseSync(process: string, timeout: number = 0): number {
  return autoit.invoke('AU3_ProcessWaitClose', INT, [LPCWSTR, INT], [process, timeout]);
}

/**
 * Waits for a process to close.
 *
 * @param process The name of the process to wait for.
 * @param timeout The timeout in seconds. Default is 0 (wait indefinitely).
 *
 * @returns A promise that resolves to 1 if the process closes, or 0 if the timeout is reached.
 *
 * @example
 * ```typescript
 * import { ProcessWaitClose } from '@ahmic/autoit-js';
 *
 * await ProcessWaitClose('notepad.exe', 10);
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/ProcessWaitClose.htm
 */
export function ProcessWaitClose(process: string, timeout: number = 0): Promise<number> {
  return autoit.invokeAsync('AU3_ProcessWaitClose', INT, [LPCWSTR, INT], [process, timeout]);
}
