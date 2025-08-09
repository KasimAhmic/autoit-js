import { INT, LPCWSTR } from './@types';
import { autoit } from './lib/autoit';

/**
 * Waits for a process to exist.
 *
 * @param process The name of the process to wait for.
 * @param timeout The timeout in seconds. Default is 0 (wait indefinitely).
 *
 * @returns 1 if the process exists, 0 if the timeout is reached.
 *
 * @example
 * ```typescript
 * import { ProcessWaitSync } from '@ahmic/autoit-js';
 *
 * ProcessWaitSync('notepad.exe', 10);
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/ProcessWait.htm
 */
export function ProcessWaitSync(process: string, timeout: number = 0): number {
  return autoit.invoke('AU3_ProcessWait', INT, [LPCWSTR, INT], [process, timeout]);
}

/**
 * Waits for a process to exist.
 *
 * @param process The name of the process to wait for.
 * @param timeout The timeout in seconds. Default is 0 (wait indefinitely).
 *
 * @returns A promise that resolves to 1 if the process exists, or 0 if the timeout is reached.
 *
 * @example
 * ```typescript
 * import { ProcessWait } from '@ahmic/autoit-js';
 *
 * await ProcessWait('notepad.exe', 10);
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/ProcessWait.htm
 */
export function ProcessWait(process: string, timeout: number = 0): Promise<number> {
  return autoit.invokeAsync('AU3_ProcessWait', INT, [LPCWSTR, INT], [process, timeout]);
}
