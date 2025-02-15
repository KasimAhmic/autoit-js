import { LPCWSTR, VOID } from './@types/win32';
import { autoit } from './autoit/autoit';
import { MouseButton } from './mouse-click';

export function MouseUp(button: MouseButton = MouseButton.Left): void {
  return autoit.invoke('AU3_MouseUp', VOID, [LPCWSTR], [button]);
}
