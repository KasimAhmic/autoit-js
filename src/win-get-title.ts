import { INT, LPCWSTR, LPWSTR, VOID } from './@types/win32';
import { autoit } from './autoit/autoit';
import { createUnicodeBuffer, unicodeBufferToString } from './util';

export function WinGetTitle(title: string, text: string = '', characters: number = 1024): string {
  const [buffer, length] = createUnicodeBuffer(characters);

  autoit.invoke('AU3_WinGetTitle', VOID, [LPCWSTR, LPCWSTR, LPWSTR, INT], [title, text, buffer, length]);

  return unicodeBufferToString(buffer);
}
