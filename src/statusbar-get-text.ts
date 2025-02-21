import { INT, LPCWSTR, LPWSTR } from './@types';
import { autoit } from './lib/autoit';
import { createUnicodeBuffer, unicodeBufferToString } from './util';

export function StatusbarGetText(
  windowTitle: string,
  windowText: string = '',
  part: number = 1,
  characterCount: number = 1024,
): string {
  const [buffer, length] = createUnicodeBuffer(characterCount);

  autoit.invoke(
    'AU3_StatusbarGetText',
    INT,
    [LPCWSTR, LPCWSTR, INT, LPWSTR, INT],
    [windowTitle, windowText, part, buffer, length],
  );

  return unicodeBufferToString(buffer);
}
