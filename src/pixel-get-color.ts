import { INT } from './@types';
import { autoit } from './autoit/autoit';

export function PixelGetColor(x: number, y: number): number {
  return autoit.invoke('AU3_PixelGetColor', INT, [INT, INT], [x, y]);
}
