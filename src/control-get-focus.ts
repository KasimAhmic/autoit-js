import { INT, LPCWSTR, LPWSTR, VOID } from './@types/win32';
import { autoit } from './autoit/autoit';
import { createUnicodeBuffer, unicodeBufferToString } from './util';

export function ControlGetFocus(title: string, text: string = ''): string {
  const [buffer, length] = createUnicodeBuffer(1024);

  autoit.invoke('AU3_ControlGetFocus', VOID, [LPCWSTR, LPCWSTR, LPWSTR, INT], [title, text, buffer, length]);

  return unicodeBufferToString(buffer);
}
