import { INT } from './@types';
import { autoit } from './lib/autoit';

/**
 * Retrieves the color of a pixel at the specified screen coordinates.
 *
 * @param x The X coordinate of the pixel.
 * @param y The Y coordinate of the pixel.
 *
 * @returns The color of the pixel as a hexadecimal number.
 *
 * @example
 * ```typescript
 * import { PixelGetColor } from '@ahmic/autoit-js';
 *
 * const color = PixelGetColor(50, 50);
 *
 * console.log(color.toString(16)); // Output: "ff00ff"
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/PixelGetColor.htm
 */
// TODO: Implement offsets when checking the color of a particular window
export function PixelGetColor(x: number, y: number): number {
  return autoit.invoke('AU3_PixelGetColor', INT, [INT, INT], [x, y]);
}
