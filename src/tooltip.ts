import { AU3_INTDEFAULT, INT, LPCWSTR, VOID } from './@types/win32';
import { autoit } from './autoit/autoit';

/**
 * TODO: Apparently non-functional
 *
 * @param text
 * @param x
 * @param y
 * @returns
 */
export function Tooltip(text: string, x: number = AU3_INTDEFAULT, y: number = AU3_INTDEFAULT): void {
  return autoit.invoke('AU3_ToolTip', VOID, [LPCWSTR, INT, INT], [text, x, y]);
}
