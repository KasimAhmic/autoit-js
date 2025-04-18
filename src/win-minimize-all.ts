import { VOID } from './@types';
import { autoit } from './lib/autoit';

/**
 * Minimizes all windows.
 *
 * @example
 * ```typescript
 * import { WinMinimizeAll } from '@ahmic/autoit-js';
 *
 * WinMinimizeAll();
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/WinMinimizeAll.htm
 */
export function WinMinimizeAll(): void {
  autoit.invoke('AU3_WinMinimizeAll', VOID, [], []);
}
