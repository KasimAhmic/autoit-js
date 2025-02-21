import { VOID } from './@types';
import { autoit } from './lib/autoit';

export function WinMinimizeAll(): void {
  autoit.invoke('AU3_WinMinimizeAll', VOID, [], []);
}
