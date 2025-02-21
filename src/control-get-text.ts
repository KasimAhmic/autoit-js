import { INT, LPCWSTR, LPWSTR, VOID } from './@types';
import { autoit } from './lib/autoit';
import { createUnicodeBuffer, unicodeBufferToString } from './util';

export function ControlGetText(
  windowTitle: string,
  windowText: string,
  controlId: string,
  characterCount: number = 1024,
): string {
  const [buffer, length] = createUnicodeBuffer(characterCount);

  autoit.invoke(
    'AU3_ControlGetText',
    VOID,
    [LPCWSTR, LPCWSTR, LPCWSTR, LPWSTR, INT],
    [windowTitle, windowText, controlId, buffer, length],
  );

  return unicodeBufferToString(buffer);
}
