import { VOID } from './@types';
import { autoit } from './lib/autoit';

/**
 * Undoes the minimize all action, restoring all minimized windows.
 *
 * @example
 * ```typescript
 * import { WinMinimizeAllUndoSync } from '@ahmic/autoit-js';
 *
 * WinMinimizeAllUndoSync();
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinMinimizeAllUndo.htm
 */
export function WinMinimizeAllUndoSync(): void {
  return autoit.invoke('AU3_WinMinimizeAllUndo', VOID, [], []);
}

/**
 * Undoes the minimize all action, restoring all minimized windows.
 *
 * @example
 * ```typescript
 * import { WinMinimizeAllUndo } from '@ahmic/autoit-js';
 *
 * await WinMinimizeAllUndo();
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinMinimizeAllUndo.htm
 */
export function WinMinimizeAllUndo(): Promise<void> {
  return autoit.invokeAsync('AU3_WinMinimizeAllUndo', VOID, [], []);
}
