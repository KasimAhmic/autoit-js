import { HWND, INT, LPWSTR } from './@types';
import { autoit } from './autoit/autoit';
import { createUnicodeBuffer, unicodeBufferToString } from './util';

export function StatusbarGetTextByHandle(
  windowHandle: bigint,
  part: number = 1,
  characterCount: number = 1024,
): string {
  const [buffer, length] = createUnicodeBuffer(characterCount);

  autoit.invoke(
    'AU3_StatusbarGetTextByHandle',
    INT,
    [HWND, INT, LPWSTR, INT],
    [windowHandle, part, buffer, length],
  );

  return unicodeBufferToString(buffer);
}
