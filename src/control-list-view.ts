import { INT, LPCWSTR, LPWSTR, VOID } from './@types';
import { autoit } from './lib/autoit';
import { createUnicodeBuffer, unicodeBufferToString } from './util';

/**
 * Enumeration of commands for interacting with a list view control.
 */
export enum ListViewCommand {
  /**
   * Deselects one or more items.
   */
  DeSelect = 'DeSelect',

  /**
   * Returns the item index of the string. Returns -1 if the string is not found.
   */
  FindItem = 'FindItem',

  /**
   * Returns the number of list items.
   */
  GetItemCount = 'GetItemCount',

  /**
   * Returns a string containing the item index of selected items. If option=0 (default) only the first
   * selected item is returned. If option=1 then all the selected items are returned delimited by |,
   * e.g: "0|3|4|10". If no items are selected a blank "" string is returned.
   */
  GetSelected = 'GetSelected',

  /**
   * Returns the number of items that are selected.
   */
  GetSelectedCount = 'GetSelectedCount',

  /**
   * Returns the number of subitems.
   */
  GetSubItemCount = 'GetSubItemCount',

  /**
   * Returns the text of a given item/subitem.
   */
  GetText = 'GetText',

  /**
   * Returns 1 if the item is selected, otherwise returns 0.
   */
  IsSelected = 'IsSelected',

  /**
   * Selects one or more items.
   */
  Select = 'Select',

  /**
   * Selects all items.
   */
  SelectAll = 'SelectAll',

  /**
   * Clears the selection of all items.
   */
  SelectClear = 'SelectClear',

  /**
   * Inverts the current selection.
   */
  SelectInvert = 'SelectInvert',

  /**
   * Changes the current view. Valid views are "list", "details", "smallicons", "largeicons".
   */
  ViewChange = 'ViewChange',
}

/**
 * Interacts with a ListView control in a window.
 *
 * @param windowTitle The title of the window to access.
 * @param windowText Optional text found in the window.
 * @param controlId The ID of the ListView control to interact with.
 * @param command The command to execute on the ListView control. See {@linkcode ListViewCommand} for details.
 * @param option1 Optional parameter for the command.
 * @param option2 Optional parameter for the command.
 * @param characters The maximum number of characters to retrieve. Default is 1024.
 *
 * @returns The result of the command as a string.
 *
 * @example
 * ```typescript
 * import { ControlListView, ListViewCommand } from '@ahmic/autoit-js';
 *
 * const itemCount = ControlListView('Untitled - Notepad', '', 'SysListView32', ListViewCommand.GetItemCount);
 *
 * console.log(itemCount); // Output: "5"
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/ControlListView.htm
 */
export function ControlListView(
  windowTitle: string,
  windowText: string,
  controlId: string,
  command: ListViewCommand,
  option1: string = '',
  option2: string = '',
  characters: number = 1024,
): string {
  const [buffer, length] = createUnicodeBuffer(characters);

  autoit.invoke(
    'AU3_ControlListView',
    VOID,
    [LPCWSTR, LPCWSTR, LPCWSTR, LPCWSTR, LPCWSTR, LPCWSTR, LPWSTR, INT],
    [windowTitle, windowText, controlId, command, option1, option2, buffer, length],
  );

  return unicodeBufferToString(buffer);
}
