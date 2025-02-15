import { INT, LPCWSTR, LPWSTR, VOID } from './@types/win32';
import { autoit } from './autoit/autoit';
import { createUnicodeBuffer, unicodeBufferToString } from './util';

/**
 * Untested.
 *
 * @param device
 * @returns
 */
export function DriveMapGet(device: string): string {
  const [buffer, length] = createUnicodeBuffer(1024);

  autoit.invoke('AU3_DriveMapGet', VOID, [LPCWSTR, LPWSTR, INT], [device, buffer, length]);

  return unicodeBufferToString(buffer);
}
