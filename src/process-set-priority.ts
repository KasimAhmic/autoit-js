import { INT, LPCWSTR } from './@types';
import { autoit } from './lib/autoit';

/**
 * Enumeration for process priority levels.
 *
 * @see https://learn.microsoft.com/en-us/windows/win32/api/processthreadsapi/nf-processthreadsapi-setpriorityclass
 */
export enum Priority {
  /** Low priority */
  Low = 0,

  /** Below normal priority */
  BelowNormal = 1,

  /** Normal priority */
  Normal = 2,

  /** Above normal priority */
  AboveNormal = 3,

  /** High priority */
  High = 4,

  /** Realtime priority */
  Realtime = 5,
}

/**
 * Sets the priority of a process.
 *
 * @param process The name or PID of the process.
 * @param priority The priority level to set. See {@linkcode Priority} for details.
 *
 * @returns 1 if successful, 0 otherwise.
 *
 * @example
 * ```typescript
 * import { ProcessSetPriority } from '@ahmic/autoit-js';
 *
 * const result = ProcessSetPriority('notepad.exe', 1);
 * console.log(result); // Output: 1 if successful, 0 otherwise
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/ProcessSetPriority.htm
 */
export function ProcessSetPriority(process: string, priority: Priority): number {
  return autoit.invoke('AU3_ProcessSetPriority', INT, [LPCWSTR, INT], [process, priority]);
}
