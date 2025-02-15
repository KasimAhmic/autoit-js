import { HWND, INT, LPCWSTR } from './@types/win32';
import { autoit } from './autoit/autoit';

export function WinMenuSelectItemByHandle(
  windowHandle: bigint,
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
    'AU3_WinMenuSelectItemByHandle',
    INT,
    [HWND, LPCWSTR, LPCWSTR, LPCWSTR, LPCWSTR, LPCWSTR, LPCWSTR, LPCWSTR, LPCWSTR],
    [windowHandle, item1, item2, item3, item4, item5, item6, item7, item8],
  );
}
