import { INT, LPCWSTR } from './@types/win32';
import { autoit } from './autoit/autoit';
import { AutoItOption } from './opt';

export function AutoItSetOption(option: AutoItOption, value: number): number {
  return autoit.invoke('AutoItSetOption', INT, [LPCWSTR, INT], [option, value]);
}
