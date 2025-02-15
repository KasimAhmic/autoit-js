import { INT, LPCWSTR, LPWSTR, VOID } from './@types/win32';
import { autoit } from './autoit/autoit';
import { createUnicodeBuffer, unicodeBufferToString } from './util';

export enum TreeViewCommand {
  Check = 'Check',
  Collapse = 'Collapse',
  Exists = 'Exists',
  Expand = 'Expand',
  GetItemCount = 'GetItemCount',
  GetSelected = 'GetSelected',
  GetText = 'GetText',
  IsChecked = 'IsChecked',
  Select = 'Select',
  Uncheck = 'Uncheck',
}

export function ControlTreeView(
  title: string,
  text: string,
  control: string,
  command: TreeViewCommand,
  extra1: string = '',
  extra2: string = '',
  characterCount: number = 1024,
): string {
  const [buffer, length] = createUnicodeBuffer(characterCount);

  autoit.invoke(
    'AU3_ControlTreeView',
    VOID,
    [LPCWSTR, LPCWSTR, LPCWSTR, LPCWSTR, LPCWSTR, LPCWSTR, LPWSTR, INT],
    [title, text, control, command, extra1, extra2, buffer, length],
  );

  return unicodeBufferToString(buffer);
}
