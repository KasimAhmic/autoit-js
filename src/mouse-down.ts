import { LPCWSTR, VOID } from './@types';
import { autoit } from './autoit/autoit';
import { MouseButton } from './mouse-click';

export function MouseDown(button: MouseButton = MouseButton.Left): void {
  return autoit.invoke('AU3_MouseDown', VOID, [LPCWSTR], [button]);
}
