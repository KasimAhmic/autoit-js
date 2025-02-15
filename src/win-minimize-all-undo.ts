import { VOID } from './@types/win32';
import { autoit } from './autoit/autoit';

export function WinMinimizeAllUndo(): void {
  autoit.invoke('AU3_WinMinimizeAllUndo', VOID, [], []);
}
