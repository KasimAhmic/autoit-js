import { INT, LPCWSTR, LPWSTR, VOID } from './@types';
import { autoit } from './lib/autoit';
import { createUnicodeBuffer, unicodeBufferToString } from './util';
import { HWND_HEX_SIZE } from './util/constants';

export function WinGetHandleAsText(windowTitle: string, windowText: string = ''): string {
  const [buffer, length] = createUnicodeBuffer(HWND_HEX_SIZE);

  autoit.invoke(
    'AU3_WinGetHandleAsText',
    VOID,
    [LPCWSTR, LPCWSTR, LPWSTR, INT],
    [windowTitle, windowText, buffer, length],
  );

  return unicodeBufferToString(buffer);
}
