import { INT, LPCWSTR, LPWSTR, VOID } from './@types';
import { autoit } from './lib/autoit';
import { createUnicodeBuffer, unicodeBufferToString } from './util';

/**
 * Retrieves the network share associated with a local drive letter.
 *
 * @param device The local drive letter to query.
 * @param characterCount The maximum number of characters to retrieve (default is 1024).
 *
 * @returns The network share associated with the local drive letter, or an empty string if not found.
 *
 * @example
 * ```typescript
 * import { DriveMapGetSync } from '@ahmic/autoit-js';
 *
 * const networkShare = DriveMapGetSync('Z:');
 *
 * console.log(networkShare); // Output: "\\server\share"
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/DriveMapGet.htm
 */
export function DriveMapGetSync(device: string, characterCount: number = 1024): string {
  const [buffer, length] = createUnicodeBuffer(characterCount);

  autoit.invoke('AU3_DriveMapGet', VOID, [LPCWSTR, LPWSTR, INT], [device, buffer, length]);

  return unicodeBufferToString(buffer);
}

/**
 * Retrieves the network share associated with a local drive letter.
 *
 * @param device The local drive letter to query.
 * @param characterCount The maximum number of characters to retrieve (default is 1024).
 *
 * @returns A promise that resolves to the network share associated with the local drive letter, or an empty
 * string if not found.
 *
 * @example
 * ```typescript
 * import { DriveMapGet } from '@ahmic/autoit-js';
 *
 * const networkShare = DriveMapGet('Z:');
 *
 * console.log(networkShare); // Output: "\\server\share"
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/DriveMapGet.htm
 */
export async function DriveMapGet(device: string, characterCount: number = 1024): Promise<string> {
  const [buffer, length] = createUnicodeBuffer(characterCount);

  await autoit.invokeAsync('AU3_DriveMapGet', VOID, [LPCWSTR, LPWSTR, INT], [device, buffer, length]);

  return unicodeBufferToString(buffer);
}
