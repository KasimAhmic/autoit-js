import { HWND, INT, LPCWSTR } from './@types';
import { autoit } from './lib/autoit';

/**
 * Selects a menu item in a window.
 *
 * Underlined items in the menu must be selected using the `&` prefix. For example, if you're following the
 * sequence `File -> Open`, you would use `&File` and `&Open` in the parameters.
 *
 * @param windowHandle The handle of the window containing the menu.
 * @param item1 The text of the first-level menu item.
 * @param item2 Optional text of the second-level menu item.
 * @param item3 Optional text of the third-level menu item.
 * @param item4 Optional text of the fourth-level menu item.
 * @param item5 Optional text of the fifth-level menu item.
 * @param item6 Optional text of the sixth-level menu item.
 * @param item7 Optional text of the seventh-level menu item.
 * @param item8 Optional text of the eighth-level menu item.
 *
 * @returns 1 if successful, 0 otherwise.
 *
 * @example
 * ```typescript
 * import { WinMenuSelectItemByHandleSync, WinGetHandleSync } from '@ahmic/autoit-js';
 *
 * const windowHandle = WinGetHandleSync('Untitled - Notepad');
 *
 * WinMenuSelectItemByHandleSync(windowHandle, 'File', 'Open');
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinMenuSelectItem.htm
 */
export function WinMenuSelectItemByHandleSync(
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

/**
 * Selects a menu item in a window.
 *
 * Underlined items in the menu must be selected using the `&` prefix. For example, if you're following the
 * sequence `File -> Open`, you would use `&File` and `&Open` in the parameters.
 *
 * @param windowHandle The handle of the window containing the menu.
 * @param item1 The text of the first-level menu item.
 * @param item2 Optional text of the second-level menu item.
 * @param item3 Optional text of the third-level menu item.
 * @param item4 Optional text of the fourth-level menu item.
 * @param item5 Optional text of the fifth-level menu item.
 * @param item6 Optional text of the sixth-level menu item.
 * @param item7 Optional text of the seventh-level menu item.
 * @param item8 Optional text of the eighth-level menu item.
 *
 * @returns A promise that resolves to 1 if successful, or 0 otherwise.
 *
 * @example
 * ```typescript
 * import { WinMenuSelectItemByHandle, WinGetHandle } from '@ahmic/autoit-js';
 *
 * const windowHandle = await WinGetHandle('Untitled - Notepad');
 *
 * await WinMenuSelectItemByHandle(windowHandle, 'File', 'Open');
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinMenuSelectItem.htm
 */
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
): Promise<number> {
  return autoit.invokeAsync(
    'AU3_WinMenuSelectItemByHandle',
    INT,
    [HWND, LPCWSTR, LPCWSTR, LPCWSTR, LPCWSTR, LPCWSTR, LPCWSTR, LPCWSTR, LPCWSTR],
    [windowHandle, item1, item2, item3, item4, item5, item6, item7, item8],
  );
}
