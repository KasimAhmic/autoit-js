import { INT, LPCWSTR, LPWSTR, VOID } from './@types';
import { autoit } from './lib/autoit';
import { createUnicodeBuffer, unicodeBufferToString } from './util';

/**
 * Enumeration of commands for interacting with controls in a window.
 */
export enum Command {
  /** Returns 1 if Control is visible, 0 otherwise */
  IsVisible = 'IsVisible',

  /** Returns 1 if Control is enabled, 0 otherwise */
  IsEnabled = 'IsEnabled',

  /** Displays the ComboBox dropdown */
  ShowDropDown = 'ShowDropDown',

  /** Hides the ComboBox dropdown */
  HideDropDown = 'HideDropDown',

  /** Adds a string to the end in a ListBox or ComboBox */
  AddString = 'AddString',

  /** Deletes a string according to occurrence in a ListBox or ComboBox */
  DelString = 'DelString',

  /** Returns occurrence ref of the exact string in a ListBox or ComboBox */
  FindString = 'FindString',

  /** Returns number of entries in a ListBox or ComboBox */
  GetCount = 'GetCount',

  /** Sets selection to occurrence ref in a ListBox or ComboBox */
  SetCurrentSelection = 'SetCurrentSelection',

  /** Sets selection according to string in a ListBox or ComboBox */
  SelectString = 'SelectString',

  /** Returns 1 if Button is checked, 0 otherwise */
  IsChecked = 'IsChecked',

  /** Checks radio or check Button */
  Check = 'Check',

  /** Unchecks radio or check Button */
  UnCheck = 'UnCheck',

  /** Returns the line # where the caret is in an Edit */
  GetCurrentLine = 'GetCurrentLine',

  /** Returns the column # where the caret is in an Edit */
  GetCurrentCol = 'GetCurrentCol',

  /** Returns name of the currently selected item in a ListBox or ComboBox */
  GetCurrentSelection = 'GetCurrentSelection',

  /** Returns # of lines in an Edit */
  GetLineCount = 'GetLineCount',

  /** Returns text at line # passed of an Edit */
  GetLine = 'GetLine',

  /** Returns selected text of an Edit */
  GetSelected = 'GetSelected',

  /** Pastes the 'string' at the Edit's caret position */
  EditPaste = 'EditPaste',

  /** Returns the current Tab shown of a SysTabControl32 */
  CurrentTab = 'CurrentTab',

  /** Moves to the next tab to the right of a SysTabControl32 */
  TabRight = 'TabRight',

  /** Moves to the next tab to the left of a SysTabControl32 */
  TabLeft = 'TabLeft',

  /** Simulates the WM_COMMAND message. Usually used for ToolbarWindow32 controls - use the ToolBar tab of Au3Info to get the Command ID. */
  SendCommandID = 'SendCommandID',
}

/**
 * Sends a command to a control in a window.
 *
 * @param windowTitle The title of the window to access.
 * @param windowText Optional text found in the window.
 * @param controlId The ID of the control to send the command to.
 * @param command The command to send to the control.
 * @param option Optional additional parameter for the command.
 * @param characterCount The size of the buffer to store the result.
 *
 * @returns The result of the command as a string.
 *
 * @example
 * ```typescript
 * import { ControlCommand } from '@ahmic/autoit-js';
 *
 * const result = ControlCommand('Untitled - Notepad', '', 'Edit1', 'IsVisible');
 *
 * console.log(result); // Output: "1" if visible, "0" otherwise
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/ControlCommand.htm
 */
export function ControlCommand(
  windowTitle: string,
  windowText: string,
  controlId: string,
  command: Command,
  option: string = '',
  characterCount: number = 1024,
): string {
  const [buffer, length] = createUnicodeBuffer(characterCount);

  autoit.invoke(
    'AU3_ControlCommand',
    VOID,
    [LPCWSTR, LPCWSTR, LPCWSTR, LPCWSTR, LPCWSTR, LPWSTR, INT],
    [windowTitle, windowText, controlId, command, option, buffer, length],
  );

  return unicodeBufferToString(buffer);
}

// TODO: See if we want to improve the return type of ControlCommand and parse the result in a more
// user-friendly way. For example, for `ControlCommand.IsVisible`, we could return a boolean instead of
// a number.
// type ControlReturn<T extends Command> = T extends Command.IsVisible
//   ? number
//   : T extends Command.IsEnabled
//     ? number
//     : T extends Command.ShowDropDown
//       ? void
//       : T extends Command.HideDropDown
//         ? void
//         : T extends Command.AddString
//           ? void
//           : T extends Command.DelString
//             ? void
//             : T extends Command.FindString
//               ? number
//               : T extends Command.GetCount
//                 ? number
//                 : T extends Command.SetCurrentSelection
//                   ? void
//                   : T extends Command.SelectString
//                     ? void
//                     : T extends Command.IsChecked
//                       ? number
//                       : T extends Command.Check
//                         ? void
//                         : T extends Command.UnCheck
//                           ? void
//                           : T extends Command.GetCurrentLine
//                             ? number
//                             : T extends Command.GetCurrentCol
//                               ? number
//                               : T extends Command.GetCurrentSelection
//                                 ? number
//                                 : T extends Command.GetLineCount
//                                   ? number
//                                   : T extends Command.GetLine
//                                     ? number
//                                     : T extends Command.GetSelected
//                                       ? number
//                                       : T extends Command.EditPaste
//                                         ? void
//                                         : T extends Command.CurrentTab
//                                           ? number
//                                           : T extends Command.TabRight
//                                             ? void
//                                             : T extends Command.TabLeft
//                                               ? void
//                                               : T extends Command.SendCommandID
//                                                 ? void
//                                                 : never;
