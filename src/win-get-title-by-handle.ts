import { HWND, INT, LPWSTR, VOID } from './@types/win32';
import { autoit } from './autoit/autoit';
import { createUnicodeBuffer, unicodeBufferToString } from './util';

export function WinGetTitleByHandle(windowHandle: number, characters: number = 1024): string {
  const [buffer, length] = createUnicodeBuffer(characters);

  autoit.invoke('AU3_WinGetTitleByHandle', VOID, [HWND, LPWSTR, INT], [windowHandle, buffer, length]);

  return unicodeBufferToString(buffer);
}
