import koffi from 'koffi';

import { INT, LPRECT, Rect, UINT } from './@types';
import { autoit } from './lib/autoit';

/**
 * Calculates a checksum for a rectangular region of pixels.
 *
 * @param left The X coordinate of the left edge of the rectangle.
 * @param top The Y coordinate of the top edge of the rectangle.
 * @param right The X coordinate of the right edge of the rectangle.
 * @param bottom The Y coordinate of the bottom edge of the rectangle.
 * @param step The step value for the calculation (default is 1).
 *
 * @returns The checksum value as a number.
 *
 * @example
 * ```typescript
 * import { PixelChecksumSync } from '@ahmic/autoit-js';
 *
 * const checksum = PixelChecksumSync(0, 0, 100, 100);
 *
 * console.log(checksum); // Output: 123456
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/PixelChecksum.htm
 */
export function PixelChecksumSync(
  left: number,
  top: number,
  right: number,
  bottom: number,
  step: number = 1,
): number {
  const rect = new Rect({ left, top, right, bottom });

  return autoit.invoke('AU3_PixelChecksum', UINT, [koffi.inout(LPRECT), INT], [rect, step]);
}

/**
 * Calculates a checksum for a rectangular region of pixels.
 *
 * @param left The X coordinate of the left edge of the rectangle.
 * @param top The Y coordinate of the top edge of the rectangle.
 * @param right The X coordinate of the right edge of the rectangle.
 * @param bottom The Y coordinate of the bottom edge of the rectangle.
 * @param step The step value for the calculation (default is 1).
 *
 * @returns A promise that resolves to the checksum value as a number.
 *
 * @example
 * ```typescript
 * import { PixelChecksum } from '@ahmic/autoit-js';
 *
 * const checksum = await PixelChecksum(0, 0, 100, 100);
 *
 * console.log(checksum); // Output: 123456
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/PixelChecksum.htm
 */
export function PixelChecksum(
  left: number,
  top: number,
  right: number,
  bottom: number,
  step: number = 1,
): Promise<number> {
  const rect = new Rect({ left, top, right, bottom });

  return autoit.invokeAsync('AU3_PixelChecksum', UINT, [koffi.inout(LPRECT), INT], [rect, step]);
}
