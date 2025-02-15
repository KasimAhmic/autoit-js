import { INT, LPCWSTR } from './@types';
import { autoit } from './autoit/autoit';

export function WinMenuSelectItem(
  windowTitle: string,
  windowText: string = '',
  item1: string,
  item2: string = '',
  item3: string = '',
  item4: string = '',
  item5: string = '',
  item6: string = '',
  item7: string = '',
  item8: string = '',
): number {
  return autoit.invoke(
    'AU3_WinMenuSelectItem',
    INT,
    [LPCWSTR, LPCWSTR, LPCWSTR, LPCWSTR, LPCWSTR, LPCWSTR, LPCWSTR, LPCWSTR, LPCWSTR, LPCWSTR],
    [windowTitle, windowText, item1, item2, item3, item4, item5, item6, item7, item8],
  );
}
