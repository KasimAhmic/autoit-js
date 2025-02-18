import { INT, LPCWSTR, LPWSTR, VOID } from './@types';
import { autoit } from './autoit/autoit';
import { createUnicodeBuffer, unicodeBufferToString } from './util';

export function ControlGetFocus(windowTitle: string, windowText: string = ''): string {
  const [buffer, length] = createUnicodeBuffer(1024);

  autoit.invoke(
    'AU3_ControlGetFocus',
    VOID,
    [LPCWSTR, LPCWSTR, LPWSTR, INT],
    [windowTitle, windowText, buffer, length],
  );

  return unicodeBufferToString(buffer);
}
