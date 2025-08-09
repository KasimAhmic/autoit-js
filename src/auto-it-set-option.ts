import { INT, LPCWSTR } from './@types';
import { autoit } from './lib/autoit';
import { AutoItOption } from './opt';

/**
 * Changes the operation of various AutoIt functions/parameters. This function can be used interchangeably
 * with {@linkcode OptSync}.
 *
 * @param option The option to change. See {@linkcode AutoItOption} for details.
 * @param value The value to assign to the option. It varies depending on the option being set.
 *
 * @returns The previous setting of the option.
 *
 * @example
 * ```typescript
 * import { AutoItSetOptionSync, AutoItOption } from '@ahmic/autoit-js';
 *
 * AutoItSetOptionSync(AutoItOption.AutoItWinTitleMatchMode, 2);
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/AutoItSetOption.htm
 */
export function AutoItSetOptionSync(option: AutoItOption, value: number): number {
  return autoit.invoke('AU3_AutoItSetOption', INT, [LPCWSTR, INT], [option, value]);
}

/**
 * Changes the operation of various AutoIt functions/parameters. This function can be used interchangeably
 * with {@linkcode Opt}.
 *
 * @param option The option to change. See {@linkcode AutoItOption} for details.
 * @param value The value to assign to the option. It varies depending on the option being set.
 *
 * @returns A promise that resolves to the previous setting of the option.
 *
 * @example
 * ```typescript
 * import { AutoItSetOption, AutoItOption } from '@ahmic/autoit-js';
 *
 * await AutoItSetOption(AutoItOption.AutoItWinTitleMatchMode, 2);
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/AutoItSetOption.htm
 */
export function AutoItSetOption(option: AutoItOption, value: number): Promise<number> {
  return autoit.invokeAsync('AU3_AutoItSetOption', INT, [LPCWSTR, INT], [option, value]);
}
