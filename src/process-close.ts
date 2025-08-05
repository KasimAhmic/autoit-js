import { INT, LPCWSTR } from './@types';
import { autoit } from './lib/autoit';

/**
 * Closes a process.
 *
 * @param process The name of the process to close (e.g., 'notepad.exe').
 *
 * @returns 1 if successful, 0 otherwise.
 *
 * @example
 * ```typescript
 * import { ProcessCloseSync } from '@ahmic/autoit-js';
 *
 * ProcessCloseSync('notepad.exe');
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/ProcessClose.htm
 */
export function ProcessCloseSync(process: string): number {
  return autoit.invoke('AU3_ProcessClose', INT, [LPCWSTR], [process]);
}

/**
 * Closes a process.
 *
 * @param process The name of the process to close (e.g., 'notepad.exe').
 *
 * @returns A promise that resolves to 1 if successful, or 0 otherwise.
 *
 * @example
 * ```typescript
 * import { ProcessClose } from '@ahmic/autoit-js';
 *
 * await ProcessClose('notepad.exe');
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/ProcessClose.htm
 */
export function ProcessClose(process: string): Promise<number> {
  return autoit.invokeAsync('AU3_ProcessClose', INT, [LPCWSTR], [process]);
}
