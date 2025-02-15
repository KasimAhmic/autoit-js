import { HWND, INT, LPCWSTR, LPWSTR, VOID } from './@types/win32';
import { autoit } from './autoit/autoit';
import { Command } from './control-command';
import { createUnicodeBuffer, unicodeBufferToString } from './util';

export function ControlCommandByHandle(
  windowHandle: number,
  control: string,
  command: Command,
  option: string = '',
  characters: number = 1024,
): string {
  const [buffer, length] = createUnicodeBuffer(characters);

  autoit.invoke(
    'AU3_ControlCommandByHandle',
    VOID,
    [HWND, LPCWSTR, LPCWSTR, LPCWSTR, LPWSTR, INT],
    [windowHandle, control, command, option, buffer, length],
  );

  return unicodeBufferToString(buffer);
}
