import { INT, LPCWSTR } from './@types/win32';
import { autoit } from './autoit/autoit';

/**
 * Untested.
 *
 * @param device
 * @returns
 */
export function DriveMapDel(device: string): number {
  return autoit.invoke('AU3_DriveMapDel', INT, [LPCWSTR], [device]);
}
