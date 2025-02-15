import { HWND, INT, LPWSTR, VOID } from './@types/win32';
import { autoit } from './autoit/autoit';
import { createUnicodeBuffer, unicodeBufferToString } from './util';

export function StatusbarGetTextByHandle(
  windowHandle: number,
  part: number = 1,
  characters: number = 1024,
): string {
  const [buffer, length] = createUnicodeBuffer(characters);

  autoit.invoke(
    'AU3_StatusbarGetTextByHandle',
    VOID,
    [HWND, INT, LPWSTR, INT],
    [windowHandle, part, buffer, length],
  );

  return unicodeBufferToString(buffer);
}
