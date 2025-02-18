import { HWND, INT, LPCWSTR, LPWSTR, VOID } from './@types';
import { autoit } from './autoit/autoit';
import { ListViewCommand } from './control-list-view';
import { createUnicodeBuffer, unicodeBufferToString } from './util';

export function ControlListViewByHandle(
  windowHandle: bigint,
  controlHandle: bigint,
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
