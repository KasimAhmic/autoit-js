import { INT, LPCWSTR, LPWSTR, VOID } from './@types';
import { autoit } from './lib/autoit';
import { createUnicodeBuffer, unicodeBufferToString } from './util';
import { HWND_HEX_SIZE } from './util/constants';

export function ControlGetHandleAsText(
  windowTitle: string,
  windowText: string = '',
  controlId: string,
): string {
  const [buffer, length] = createUnicodeBuffer(HWND_HEX_SIZE);

  autoit.invoke(
    'AU3_ControlGetHandleAsText',
    VOID,
    [LPCWSTR, LPCWSTR, LPCWSTR, LPWSTR, INT],
    [windowTitle, windowText, controlId, buffer, length],
  );

  return unicodeBufferToString(buffer);
}
