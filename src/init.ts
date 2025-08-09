import { VOID } from './@types';
import { autoit } from './lib/autoit';

/**
 * Initializes the AutoIt library.
 *
 * @example
 * ```typescript
 * import { InitSync } from '@ahmic/autoit-js';
 *
 * InitSync();
 * ```
 */
export function InitSync(): void {
  return autoit.invoke('AU3_Init', VOID, [], []);
}

/**
 * Initializes the AutoIt library.
 *
 * @example
 * ```typescript
 * import { Init } from '@ahmic/autoit-js';
 *
 * await Init();
 * ```
 */
export function Init(): Promise<void> {
  return autoit.invokeAsync('AU3_Init', VOID, [], []);
}
