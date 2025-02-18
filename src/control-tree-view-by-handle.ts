import { HWND, INT, LPCWSTR, LPWSTR, VOID } from './@types';
import { autoit } from './autoit/autoit';
import { TreeViewCommand } from './control-tree-view';
import { createUnicodeBuffer, unicodeBufferToString } from './util';

export function ControlTreeViewByHandle(
  windowHandle: bigint,
  controlHandle: bigint,
  command: TreeViewCommand,
  extra1: string = '',
  extra2: string = '',
  characterCount: number = 1024,
): string {
  const [buffer, length] = createUnicodeBuffer(characterCount);

  autoit.invoke(
    'AU3_ControlTreeViewByHandle',
    VOID,
    [HWND, HWND, LPCWSTR, LPCWSTR, LPCWSTR, LPWSTR, INT],
    [windowHandle, controlHandle, command, extra1, extra2, buffer, length],
  );

  return unicodeBufferToString(buffer);
}
