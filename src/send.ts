import { INT, LPCWSTR, VOID } from './@types';
import { autoit } from './lib/autoit';

/**
 * The mode in which to send keys.
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/Send.htm
 */
export enum SendMode {
  /** Text contains special characters like + and ! to indicate SHIFT and ALT key-presses. */
  Default = 0,

  /** Keys are sent raw. */
  Raw = 1,
}

/**
 * Sends simulated keystrokes to the active window.
 *
 * @param value The string of keys to send.
 * @param mode The mode to use for sending keys. See {@linkcode SendMode} for details.
 *
 * @example
 * ```typescript
 * import { Send } from '@ahmic/autoit-js';
 *
 * Send('Hello, world!');
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/Send.htm
 */
export function Send(value: string, mode: SendMode = SendMode.Default): void {
  return autoit.invoke('AU3_Send', VOID, [LPCWSTR, INT], [value, mode]);
}
