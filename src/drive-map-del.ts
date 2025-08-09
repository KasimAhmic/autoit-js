import { INT, LPCWSTR } from './@types';
import { autoit } from './lib/autoit';

/**
 * Removes a mapped network drive.
 *
 * @param device The local drive letter to unmap (e.g., 'Z:').
 *
 * @returns 1 if successful, 0 otherwise.
 *
 * @example
 * ```typescript
 * import { DriveMapDelSync } from '@ahmic/autoit-js';
 *
 * DriveMapDelSync('Z:');
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/DriveMapDel.htm
 */
export function DriveMapDelSync(device: string): number {
  return autoit.invoke('AU3_DriveMapDel', INT, [LPCWSTR], [device]);
}

/**
 * Removes a mapped network drive.
 *
 * @param device The local drive letter to unmap (e.g., 'Z:').
 *
 * @returns A promise that resolves to 1 if successful, 0 otherwise.
 *
 * @example
 * ```typescript
 * import { DriveMapDel } from '@ahmic/autoit-js';
 *
 * await DriveMapDel('Z:');
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/DriveMapDel.htm
 */
export function DriveMapDel(device: string): Promise<number> {
  return autoit.invokeAsync('AU3_DriveMapDel', INT, [LPCWSTR], [device]);
}
