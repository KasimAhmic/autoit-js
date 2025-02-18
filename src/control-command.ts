import { INT, LPCWSTR, LPWSTR, VOID } from './@types';
import { autoit } from './autoit/autoit';
import { createUnicodeBuffer, unicodeBufferToString } from './util';

export enum Command {
  IsVisible = 'IsVisible',
  IsEnabled = 'IsEnabled',
  ShowDropDown = 'ShowDropDown',
  HideDropDown = 'HideDropDown',
  AddString = 'AddString',
  DelString = 'DelString',
  FindString = 'FindString',
  GetCount = 'GetCount',
  SetCurrentSelection = 'SetCurrentSelection',
  SelectString = 'SelectString',
  IsChecked = 'IsChecked',
  Check = 'Check',
  UnCheck = 'UnCheck',
  GetCurrentLine = 'GetCurrentLine',
  GetCurrentCol = 'GetCurrentCol',
  GetCurrentSelection = 'GetCurrentSelection',
  GetLineCount = 'GetLineCount',
  GetLine = 'GetLine',
  GetSelected = 'GetSelected',
  EditPaste = 'EditPaste',
  CurrentTab = 'CurrentTab',
  TabRight = 'TabRight',
  TabLeft = 'TabLeft',
  SendCommandID = 'SendCommandID',
}

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
