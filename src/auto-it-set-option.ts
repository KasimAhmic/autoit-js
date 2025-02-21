import { INT, LPCWSTR } from './@types';
import { autoit } from './lib/autoit';
import { AutoItOption } from './opt';

export function AutoItSetOption(option: AutoItOption, value: number): number {
  return autoit.invoke('AU3_AutoItSetOption', INT, [LPCWSTR, INT], [option, value]);
}
