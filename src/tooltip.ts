import { AU3_INTDEFAULT, INT, LPCWSTR, VOID } from './@types';
import { autoit } from './autoit/autoit';

/**
 * TODO: Apparently non-functional
 *
 * @param value
 * @param x
 * @param y
 * @returns
 */
export function Tooltip(value: string, x: number = AU3_INTDEFAULT, y: number = AU3_INTDEFAULT): void {
  return autoit.invoke('AU3_ToolTip', VOID, [LPCWSTR, INT, INT], [value, x, y]);
}
