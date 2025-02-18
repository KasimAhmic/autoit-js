import { VOID } from './@types';
import { autoit } from './autoit/autoit';

export function WinMinimizeAll(): void {
  autoit.invoke('AU3_WinMinimizeAll', VOID, [], []);
}
