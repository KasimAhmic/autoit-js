import { INT, LPCWSTR, LPWSTR, VOID } from './@types';
import { autoit } from './lib/autoit';
import { createUnicodeBuffer, unicodeBufferToString } from './util';

/**
 * Enumeration for drive mapping flags.
 */
export enum DriveMapFlag {
  /** Default */
  Default = 0,

  /** Persistant mapping */
  Persistant = 1,

  /** Show authentication dialog if required */
  Authentication = 8,
}

/**
 * Maps a network drive to a local drive letter.
 *
 * @param device The local drive letter to map.
 * @param share The network share to map to.
 * @param flags Optional flags to control the mapping behavior.
 * @param username Optional username for authentication.
 * @param password Optional password for authentication.
 *
 * @returns "1" if successful, "0" if failed.
 *
 * @example
 * ```typescript
 * import { DriveMapAddSync, DriveMapFlag } from '@ahmic/autoit-js';
 *
 * DriveMapAddSync('Z:', '\\server\share', DriveMapFlag.Authentication, 'user', 'password');
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/DriveMapAdd.htm
 */
export function DriveMapAddSync(
  device: string,
  share: string,
  flags: DriveMapFlag = DriveMapFlag.Default,
  username: string = '',
  password: string = '',
): string {
  const [buffer, length] = createUnicodeBuffer(1024);

  autoit.invoke(
    'AU3_DriveMapAdd',
    VOID,
    [LPCWSTR, LPCWSTR, INT, LPCWSTR, LPCWSTR, LPWSTR, INT],
    [device, share, flags, username, password, buffer, length],
  );

  return unicodeBufferToString(buffer);
}

/**
 * Maps a network drive to a local drive letter.
 *
 * @param device The local drive letter to map.
 * @param share The network share to map to.
 * @param flags Optional flags to control the mapping behavior.
 * @param username Optional username for authentication.
 * @param password Optional password for authentication.
 *
 * @returns A promise that resolves to "1" if successful, "0" if failed.
 *
 * @example
 * ```typescript
 * import { DriveMapAdd, DriveMapFlag } from '@ahmic/autoit-js';
 *
 * DriveMapAdd('Z:', '\\server\share', DriveMapFlag.Authentication, 'user', 'password');
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/DriveMapAdd.htm
 */
export async function DriveMapAdd(
  device: string,
  share: string,
  flags: DriveMapFlag = DriveMapFlag.Default,
  username: string = '',
  password: string = '',
): Promise<string> {
  const [buffer, length] = createUnicodeBuffer(1024);

  await autoit.invokeAsync(
    'AU3_DriveMapAdd',
    VOID,
    [LPCWSTR, LPCWSTR, INT, LPCWSTR, LPCWSTR, LPWSTR, INT],
    [device, share, flags, username, password, buffer, length],
  );

  return unicodeBufferToString(buffer);
}
