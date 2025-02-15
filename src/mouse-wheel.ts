import { INT, LPCWSTR, VOID } from './@types/win32';
import { autoit } from './autoit/autoit';

export enum ScrollDirection {
  Up = 'up',
  Down = 'down',
}

export function MouseWheel(direction: ScrollDirection, clicks: number = 1): void {
  autoit.invoke('AU3_MouseWheel', VOID, [LPCWSTR, INT], [direction, clicks]);
}
