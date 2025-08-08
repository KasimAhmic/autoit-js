import { INT, LPCWSTR, LPWSTR, VOID } from './@types';
import { autoit } from './lib/autoit';
import { createUnicodeBuffer, unicodeBufferToString } from './util';

/**
 * Enumeration of commands for interacting with a tree view control.
 */
export enum TreeViewCommand {
  /**
   * Checks an item (if the item supports it).
   */
  Check = 'Check',

  /**
   * Collapses an item to hide its children.
   */
  Collapse = 'Collapse',

  /**
   * Returns 1 if an item exists, otherwise 0.
   */
  Exists = 'Exists',

  /**
   * Expands an item to show its children.
   */
  Expand = 'Expand',

  /**
   * Returns the number of children for a selected item.
   */
  GetItemCount = 'GetItemCount',

  /**
   * Returns the item reference of the current selection using the text reference of the item (or index
   * reference if UseIndex is set to 1).
   *
   * | UseIndex | Result          | Example |
   * |----------|-----------------|---------|
   * | `''`     | Text reference  | Child 2 |
   * | `'1'`    | Index reference | #2      |
   */
  GetSelected = 'GetSelected',

  /**
   * Returns the text of an item.
   */
  GetText = 'GetText',

  /**
   * Returns the state of an item.
   *
   * | Value | Description    |
   * |-------|----------------|
   * | 1     | Checked        |
   * | 0     | Unchecked      |
   * | -1    | Not a checkbox |
   */
  IsChecked = 'IsChecked',

  /**
   * Selects an item.
   */
  Select = 'Select',

  /**
   * Unchecks an item (if the item supports it).
   */
  Uncheck = 'Uncheck',
}

/**
 * Interacts with a tree view control in a window.
 *
 * @param windowTitle The title of the window to access.
 * @param windowText Optional text found in the window.
 * @param controlId The ID of the tree view control to interact with.
 * @param command The command to send to the tree view control.
 * @param option1 Optional parameter for the command.
 * @param option2 Optional parameter for the command.
 *
 * @returns The result of the command as a string.
 *
 * @example
 * ```typescript
 * import { ControlTreeViewSync } from '@ahmic/autoit-js';
 *
 * const result = ControlTreeViewSync('Untitled - Notepad', '', 'SysTreeView32', 'GetItemCount');
 *
 * console.log(result); // Output: "5"
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/ControlTreeView.htm
 */
export function ControlTreeViewSync(
  windowTitle: string,
  windowText: string,
  controlId: string,
  command: TreeViewCommand,
  option1: string = '',
  option2: string = '',
  characterCount: number = 1024,
): string {
  const [buffer, length] = createUnicodeBuffer(characterCount);

  autoit.invoke(
    'AU3_ControlTreeView',
    VOID,
    [LPCWSTR, LPCWSTR, LPCWSTR, LPCWSTR, LPCWSTR, LPCWSTR, LPWSTR, INT],
    [windowTitle, windowText, controlId, command, option1, option2, buffer, length],
  );

  return unicodeBufferToString(buffer);
}

/**
 * Interacts with a tree view control in a window.
 *
 * @param windowTitle The title of the window to access.
 * @param windowText Optional text found in the window.
 * @param controlId The ID of the tree view control to interact with.
 * @param command The command to send to the tree view control.
 * @param option1 Optional parameter for the command.
 * @param option2 Optional parameter for the command.
 *
 * @returns A promise that resolves to the result of the command as a string.
 *
 * @example
 * ```typescript
 * import { ControlTreeView } from '@ahmic/autoit-js';
 *
 * const result = await ControlTreeView('Untitled - Notepad', '', 'SysTreeView32', 'GetItemCount');
 *
 * console.log(result); // Output: "5"
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/ControlTreeView.htm
 */
export async function ControlTreeView(
  windowTitle: string,
  windowText: string,
  controlId: string,
  command: TreeViewCommand,
  option1: string = '',
  option2: string = '',
  characterCount: number = 1024,
): Promise<string> {
  const [buffer, length] = createUnicodeBuffer(characterCount);

  await autoit.invokeAsync(
    'AU3_ControlTreeView',
    VOID,
    [LPCWSTR, LPCWSTR, LPCWSTR, LPCWSTR, LPCWSTR, LPCWSTR, LPWSTR, INT],
    [windowTitle, windowText, controlId, command, option1, option2, buffer, length],
  );

  return unicodeBufferToString(buffer);
}
