import { VOID } from './@types';
import { autoit } from './lib/autoit';

/**
 * Minimizes all windows.
 *
 * @example
 * ```typescript
 * import { WinMinimizeAllSync } from '@ahmic/autoit-js';
 *
 * WinMinimizeAllSync();
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinMinimizeAll.htm
 */
export function WinMinimizeAllSync(): void {
  return autoit.invoke('AU3_WinMinimizeAll', VOID, [], []);
}

/**
 * Minimizes all windows.
 *
 * @example
 * ```typescript
 * import { WinMinimizeAll } from '@ahmic/autoit-js';
 *
 * await WinMinimizeAll();
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinMinimizeAll.htm
 */
export function WinMinimizeAll(): Promise<void> {
  return autoit.invokeAsync('AU3_WinMinimizeAll', VOID, [], []);
}
