import { INT } from './@types';
import { autoit } from './autoit/autoit';

// TODO: Implement offsets when checking the color of a particular window
export function PixelGetColor(x: number, y: number): number {
  return autoit.invoke('AU3_PixelGetColor', INT, [INT, INT], [x, y]);
}
