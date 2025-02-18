import { HWND, INT, LPCWSTR, LPWSTR, VOID } from './@types';
import { autoit } from './autoit/autoit';
import { Command } from './control-command';
import { createUnicodeBuffer, unicodeBufferToString } from './util';

export function ControlCommandByHandle(
  windowHandle: bigint,
  controlHandle: bigint,
  command: Command,
  option: string = '',
  characterCount: number = 1024,
): string {
  const [buffer, length] = createUnicodeBuffer(characterCount);

  autoit.invoke(
    'AU3_ControlCommandByHandle',
    VOID,
    [HWND, HWND, LPCWSTR, LPCWSTR, LPWSTR, INT],
    [windowHandle, controlHandle, command, option, buffer, length],
  );

  return unicodeBufferToString(buffer);
}
