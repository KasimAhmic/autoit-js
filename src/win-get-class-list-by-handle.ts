import { HWND, INT, LPWSTR, VOID } from './@types';
import { autoit } from './autoit/autoit';
import { createUnicodeBuffer, unicodeBufferToString } from './util';

export function WinGetClassListByHandle(windowHandle: bigint, characterCount: number = 1024): string {
  const [buffer, length] = createUnicodeBuffer(characterCount);

  autoit.invoke('AU3_WinGetClassListByHandle', VOID, [HWND, LPWSTR, INT], [windowHandle, buffer, length]);

  return unicodeBufferToString(buffer);
}
