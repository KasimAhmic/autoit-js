import { INT, LPCWSTR, LPWSTR, VOID } from './@types/win32';
import { autoit } from './autoit/autoit';
import { createUnicodeBuffer, unicodeBufferToString } from './util';

export function ControlGetText(
  title: string,
  text: string,
  control: string,
  characters: number = 1024,
): string {
  const [buffer, length] = createUnicodeBuffer(characters);

  autoit.invoke(
    'AU3_ControlGetText',
    VOID,
    [LPCWSTR, LPCWSTR, LPCWSTR, LPWSTR, INT],
    [title, text, control, buffer, length],
  );

  return unicodeBufferToString(buffer);
}
