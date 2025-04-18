import { INT, LPCWSTR } from './@types';
import { autoit } from './lib/autoit';

/**
 * Checks if a process exists.
 *
 * @param process The name of the process to check (e.g., 'notepad.exe').
 *
 * @returns True if the process exists, false otherwise.
 *
 * @example
 * ```typescript
 * import { ProcessExists } from '@ahmic/autoit-js';
 *
 * const exists = ProcessExists('notepad.exe');
 *
 * console.log(exists); // Output: true
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/ProcessExists.htm
 */
export function ProcessExists(process: string): boolean {
  return autoit.invoke('AU3_ProcessExists', INT, [LPCWSTR], [process]) !== 0;
}
