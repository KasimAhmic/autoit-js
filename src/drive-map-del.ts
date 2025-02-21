import { INT, LPCWSTR } from './@types';
import { autoit } from './lib/autoit';

/**
 * Untested.
 *
 * @param device
 * @returns
 */
export function DriveMapDel(device: string): number {
  return autoit.invoke('AU3_DriveMapDel', INT, [LPCWSTR], [device]);
}
