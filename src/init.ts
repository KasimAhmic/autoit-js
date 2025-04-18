import { VOID } from './@types';
import { autoit } from './lib/autoit';

/**
 * Initializes the AutoIt library.
 *
 * @example
 * ```typescript
 * import { Init } from '@ahmic/autoit-js';
 *
 * Init();
 * ```
 */
export function Init(): void {
  return autoit.invoke('AU3_Init', VOID, [], []);
}
