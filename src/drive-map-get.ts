import { INT, LPCWSTR, LPWSTR, VOID } from './@types';
import { autoit } from './lib/autoit';
import { createUnicodeBuffer, unicodeBufferToString } from './util';

/**
 * Untested.
 *
 * @param device
 * @returns
 */
export function DriveMapGet(device: string, characterCount: number = 1024): string {
  const [buffer, length] = createUnicodeBuffer(characterCount);

  autoit.invoke('AU3_DriveMapGet', VOID, [LPCWSTR, LPWSTR, INT], [device, buffer, length]);

  return unicodeBufferToString(buffer);
}
