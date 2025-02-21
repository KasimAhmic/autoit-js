import { INT, LPWSTR, VOID } from './@types';
import { autoit } from './lib/autoit';
import { createUnicodeBuffer, unicodeBufferToString } from './util/buffer.util';

export function ClipGet(characterCount: number = 2048): string {
  const [buffer, length] = createUnicodeBuffer(characterCount);

  autoit.invoke('AU3_ClipGet', VOID, [LPWSTR, INT], [buffer, length]);

  return unicodeBufferToString(buffer);
}
