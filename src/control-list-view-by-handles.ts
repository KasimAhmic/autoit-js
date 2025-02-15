import { HWND, INT, LPCWSTR, LPWSTR, VOID } from './@types/win32';
import { autoit } from './autoit/autoit';
import { ListViewCommand } from './control-list-view';
import { createUnicodeBuffer, unicodeBufferToString } from './util';

export function ControlListViewByHandle(
  windowHandle: number,
  controlHandle: number,
  command: ListViewCommand,
  option1: string = '',
  option2: string = '',
  characterCount: number = 1024,
): string {
  const [buffer, length] = createUnicodeBuffer(characterCount);

  autoit.invoke(
    'AU3_ControlListViewByHandle',
    VOID,
    [HWND, HWND, LPCWSTR, LPCWSTR, LPCWSTR, LPWSTR, INT],
    [windowHandle, controlHandle, command, option1, option2, buffer, length],
  );

  return unicodeBufferToString(buffer);
}
