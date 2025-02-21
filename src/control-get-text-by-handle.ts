import { HWND, INT, LPWSTR, VOID } from './@types';
import { autoit } from './lib/autoit';
import { createUnicodeBuffer, unicodeBufferToString } from './util';

export function ControlGetTextByHandle(
  windowHandle: bigint,
  controlHandle: bigint,
  characterCount: number = 1024,
): string {
  const [buffer, length] = createUnicodeBuffer(characterCount);

  autoit.invoke(
    'AU3_ControlGetTextByHandle',
    VOID,
    [HWND, HWND, LPWSTR, INT],
    [windowHandle, controlHandle, buffer, length],
  );

  return unicodeBufferToString(buffer);
}
