import { HWND, INT, LPCWSTR, LPWSTR, VOID } from './@types';
import { ListViewCommand } from './control-list-view';
import { autoit } from './lib/autoit';
import { createUnicodeBuffer, unicodeBufferToString } from './util';

/**
 * Interacts with a ListView control in a window.
 *
 * @param windowHandle The handle of the window to access.
 * @param controlHandle The handle of the ListView control to interact with.
 * @param command The command to execute on the ListView control. See {@linkcode ListViewCommand} for details.
 * @param option1 Optional parameter for the command.
 * @param option2 Optional parameter for the command.
 * @param characterCount The maximum number of characters to retrieve. Default is 1024.
 *
 * @returns The result of the command as a string.
 *
 * @example
 * ```typescript
 * import { ControlListViewByHandle, ListViewCommand, ControlGetHandle, WinGetHandle } from '@ahmic/autoit-js';
 *
 * const windowHandle = WinGetHandle('Untitled - Notepad');
 * const controlHandle = ControlGetHandle(windowHandle, 'SysListView32');
 *
 * const itemCount = ControlListViewByHandle(windowHandle, controlHandle, ListViewCommand.GetItemCount);
 *
 * console.log(itemCount); // Output: "5"
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/ControlListView.htm
 */
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
