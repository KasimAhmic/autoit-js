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
 * import { ProcessClose } from '@ahmic/autoit-js';
 *
 * ProcessClose('notepad.exe');
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/ProcessClose.htm
 */
export function ProcessClose(process: string): number {
  return autoit.invoke('AU3_ProcessClose', INT, [LPCWSTR], [process]);
}
