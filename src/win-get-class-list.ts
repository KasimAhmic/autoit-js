import { INT, LPCWSTR, LPWSTR, VOID } from './@types';
import { autoit } from './autoit/autoit';
import { createUnicodeBuffer, unicodeBufferToString } from './util';

export function WinGetClassList(
  windowTitle: string,
  windowText: string = '',
  characterCount: number = 1024,
): string {
  const [buffer, length] = createUnicodeBuffer(characterCount);

  autoit.invoke(
    'AU3_WinGetClassList',
    VOID,
    [LPCWSTR, LPCWSTR, LPWSTR, INT],
    [windowTitle, windowText, buffer, length],
  );

  return unicodeBufferToString(buffer);
}
