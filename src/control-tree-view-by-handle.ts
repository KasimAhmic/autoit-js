import { HWND, INT, LPCWSTR, LPWSTR, VOID } from './@types';
import { TreeViewCommand } from './control-tree-view';
import { autoit } from './lib/autoit';
import { createUnicodeBuffer, unicodeBufferToString } from './util';

/**
 * Interacts with a tree view control in a window.
 *
 * @param windowHandle The handle of the window to access.
 * @param controlHandle The handle of the tree view control to interact with.
 * @param command The command to send to the tree view control.
 * @param option1 Optional parameter for the command.
 * @param option2 Optional parameter for the command.
 *
 * @returns The result of the command as a string.
 *
 * @example
 * ```typescript
 * import { ControlTreeViewByHandle, WinGetHandle, ControlGetHandle } from '@ahmic/autoit-js';
 *
 * const windowHandle = WinGetHandle('Untitled - Notepad');
 * const controlHandle = ControlGetHandle(windowHandle, 'SysTreeView32');
 * const result = ControlTreeViewByHandle(windowHandle, controlHandle, 'GetItemCount');
 *
 * console.log(result); // Output: "5"
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/ControlTreeView.htm
 */
export function ControlTreeViewByHandle(
  windowHandle: bigint,
  controlHandle: bigint,
  command: TreeViewCommand,
  option1: string = '',
  option2: string = '',
  characterCount: number = 1024,
): string {
  const [buffer, length] = createUnicodeBuffer(characterCount);

  autoit.invoke(
    'AU3_ControlTreeViewByHandle',
    VOID,
    [HWND, HWND, LPCWSTR, LPCWSTR, LPCWSTR, LPWSTR, INT],
    [windowHandle, controlHandle, command, option1, option2, buffer, length],
  );

  return unicodeBufferToString(buffer);
}
