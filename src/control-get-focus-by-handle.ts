import { HWND, INT, LPWSTR, VOID } from './@types';
import { autoit } from './lib/autoit';
import { createUnicodeBuffer, unicodeBufferToString } from './util';

export function ControlGetFocusByHandle(windowHandle: bigint): string {
  const [buffer, length] = createUnicodeBuffer(1024);

  autoit.invoke('AU3_ControlGetFocusByHandle', VOID, [HWND, LPWSTR, INT], [windowHandle, buffer, length]);

  return unicodeBufferToString(buffer);
}
