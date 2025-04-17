import { INT, LPCWSTR } from './@types';
import { autoit } from './lib/autoit';
import { AutoItOption } from './opt';

/**
 * Changes the operation of various AutoIt functions/parameters. This function can be used interchangeably
 * with {@linkcode Opt}.
 *
 * @param option The option to change. See {@linkcode AutoItOption} for details.
 * @param value The value to assign to the option. It varies depending on the option being set.
 *
 * @returns The previous setting of the option.
 *
 * @example
 * ```typescript
 * import { AutoItSetOption, AutoItOption } from '@ahmic/autoit-js';
 *
 * AutoItSetOption(AutoItOption.AutoItWinTitleMatchMode, 2);
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/AutoItSetOption.htm
 */
export function AutoItSetOption(option: AutoItOption, value: number): number {
  return autoit.invoke('AU3_AutoItSetOption', INT, [LPCWSTR, INT], [option, value]);
}
