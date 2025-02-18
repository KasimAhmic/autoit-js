import { INT, LPCWSTR, LPWSTR, VOID } from './@types';
import { autoit } from './autoit/autoit';
import { createUnicodeBuffer, unicodeBufferToString } from './util';

export enum DriveMapFlag {
  Default = 0,
  Persistant = 1,
  Authentication = 8,
}

/**
 * Untested.
 *
 * @param device
 * @param share
 * @param flags
 * @param username
 * @param password
 * @returns
 */
export function DriveMapAdd(
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
