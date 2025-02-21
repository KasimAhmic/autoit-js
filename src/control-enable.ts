import { INT, LPCWSTR } from './@types';
import { autoit } from './lib/autoit';

export function ControlEnable(windowTitle: string, windowText: string, controlId: string): number {
  return autoit.invoke(
    'AU3_ControlEnable',
    INT,
    [LPCWSTR, LPCWSTR, LPCWSTR],
    [windowTitle, windowText, controlId],
  );
}
