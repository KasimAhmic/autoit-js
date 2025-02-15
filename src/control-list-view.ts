import { INT, LPCWSTR, LPWSTR, VOID } from './@types/win32';
import { autoit } from './autoit/autoit';
import { createUnicodeBuffer, unicodeBufferToString } from './util';

export enum ListViewCommand {
  DeSelect = 'DeSelect',
  FindItem = 'FindItem',
  GetItemCount = 'GetItemCount',
  GetSelected = 'GetSelected',
  GetSelectedCount = 'GetSelectedCount',
  GetSubItemCount = 'GetSubItemCount',
  GetText = 'GetText',
  IsSelected = 'IsSelected',
  Select = 'Select',
  SelectAll = 'SelectAll',
  SelectClear = 'SelectClear',
  SelectInvert = 'SelectInvert',
  ViewChange = 'ViewChange',
}

export function ControlListView(
  windowTitle: string,
  windowText: string,
  control: string,
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
    [windowTitle, windowText, control, command, option1, option2, buffer, length],
  );

  return unicodeBufferToString(buffer);
}
