import { VOID } from './@types';
import { autoit } from './lib/autoit';

/**
 * Undoes the minimize all action, restoring all minimized windows.
 *
 * @example
 * ```typescript
 * import { WinMinimizeAllUndo } from '@ahmic/autoit-js';
 *
 * WinMinimizeAllUndo();
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinMinimizeAllUndo.htm
 */
export function WinMinimizeAllUndo(): void {
  autoit.invoke('AU3_WinMinimizeAllUndo', VOID, [], []);
}
