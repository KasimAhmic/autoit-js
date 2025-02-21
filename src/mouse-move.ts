import { INT } from './@types';
import { autoit } from './lib/autoit';

export function MouseMove(x: number, y: number, speed: number = -1): number {
  return autoit.invoke('AU3_MouseMove', INT, [INT, INT, INT], [x, y, speed]);
}
