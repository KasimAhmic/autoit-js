import { VOID } from './@types';
import { autoit } from './lib/autoit';

export function WinMinimizeAllUndo(): void {
  autoit.invoke('AU3_WinMinimizeAllUndo', VOID, [], []);
}
