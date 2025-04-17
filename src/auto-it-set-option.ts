import { INT, LPCWSTR } from './@types';
import { autoit } from './lib/autoit';
import { AutoItOption } from './opt';

/**
 * Changes the operation of various AutoIt functions/parameters. Note that this function and {@linkcode Opt}
 * are essentially aliases of one another and you can use them interchangeably.
 *
 * @param option The option to change. See {@linkcode AutoItOption} for details.
 * @param value The value to assign to the option. It varies depending on the option being set.
 *
 * @returns The previous setting of the option.
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/Opt.htm
 */
export function AutoItSetOption(option: AutoItOption, value: number): number {
  return autoit.invoke('AU3_AutoItSetOption', INT, [LPCWSTR, INT], [option, value]);
}
