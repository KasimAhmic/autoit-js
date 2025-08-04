import { IPoint, Point } from './@types';
import { BitmapInfo } from './@types/bitmap-info';
import { BitmapInfoHeader } from './@types/bitmap-info-header';
import {
  BitBlt,
  BitBltSync,
  CreateCompatibleBitmap,
  CreateCompatibleBitmapSync,
  CreateCompatibleDC,
  CreateCompatibleDCSync,
  DeleteDC,
  DeleteDCSync,
  DeleteObject,
  DeleteObjectSync,
  GetDIBits,
  GetDIBitsSync,
  SelectObject,
  SelectObjectSync,
} from './lib/gdi32';
import { GetDC, GetDCSync, ReleaseDC, ReleaseDCSync } from './lib/user32';

const SRCCOPY = 0x00cc0020;
const CAPTUREBLT = 0x40000000;
const BI_RGB = 0x00000000;

const NOT_FOUND = new Point({ x: -1, y: -1 });

/**
 * Searchs for a given pixel within the specified region.
 *
 * The actual `AU3_PixelSearch` function from AutoIt appears to be broken so it has been reimplemented here
 * using Windows GDI32 and User32 libraries.
 *
 * @see https://www.autoitscript.com/forum/topic/210967-autoitx-au3_pixelsearch-access-violation/
 * @see https://www.autoitscript.com/forum/topic/210967-autoitx-au3_pixelsearch-access-violation/#comment-1525551
 *
 * @param left The X coordinate of the left edge of the rectangle.
 * @param top The Y coordinate of the top edge of the rectangle.
 * @param right The X coordinate of the right edge of the rectangle.
 * @param bottom The Y coordinate of the bottom edge of the rectangle.
 * @param color The color to search for, in `0xRRGGBB` format.
 * @param shadeVariation The allowed variation in color shades (default is 0).
 * @param step The step value for the search (default is 1).
 *
 * @returns An {@linkcode IPoint} object with the coordinates of the found pixel. If the pixel is not found,
 * returns a point with coordinates (-1, -1).
 *
 * @example
 * ```typescript
 * import { PixelSearchSync } from '@ahmic/autoit-js';
 *
 * const result = PixelSearchSync(0, 0, 100, 100, 0xFF0000);
 *
 * console.log(result); // Output: { x: 50, y: 50 }
 * ```
 */
export function PixelSearchSync(
  left: number,
  top: number,
  right: number,
  bottom: number,
  color: number,
  shadeVariation: number = 0,
  step: number = 1,
): IPoint {
  const width = right - left;
  const height = bottom - top;

  const screenDeviceContext = GetDCSync(null);
  const memoryDeviceContext = CreateCompatibleDCSync(screenDeviceContext);
  const bitmap = CreateCompatibleBitmapSync(screenDeviceContext, width, height);

  function cleanup() {
    DeleteObjectSync(bitmap);
    DeleteDCSync(memoryDeviceContext);
    ReleaseDCSync(null, screenDeviceContext);
  }

  if (!SelectObjectSync(memoryDeviceContext, bitmap)) {
    console.warn('SelectObjectSync failed');
    cleanup();

    return NOT_FOUND;
  }

  if (
    !BitBltSync(
      memoryDeviceContext,
      0,
      0,
      width,
      height,
      screenDeviceContext,
      left,
      top,
      SRCCOPY | CAPTUREBLT,
    )
  ) {
    console.warn('BitBltSync failed');
    cleanup();

    return NOT_FOUND;
  }

  const imageSize = width * height * 4;

  const bitmapInfoHeader = new BitmapInfoHeader({
    biWidth: width,
    biHeight: -height,
    biPlanes: 1,
    biBitCount: 32,
    biCompression: BI_RGB,
    biSizeImage: imageSize,
  });

  const bitmapInfo = new BitmapInfo({
    bmiHeader: bitmapInfoHeader,
    bmiColors: [{}],
  });

  const pixels = new Uint8Array(imageSize);

  const rows = GetDIBitsSync(memoryDeviceContext, bitmap, 0, height, pixels, bitmapInfo, 0);

  if (rows === 0) {
    console.warn('GetDIBitsSync failed');
    cleanup();

    return NOT_FOUND;
  }

  const result = search(color, left, top, width, height, step, shadeVariation, pixels);

  cleanup();

  return result;
}

/**
 * Searchs for a given pixel within the specified region.
 *
 * The actual `AU3_PixelSearch` function from AutoIt appears to be broken so it has been reimplemented here
 * using Windows GDI32 and User32 libraries.
 *
 * @see https://www.autoitscript.com/forum/topic/210967-autoitx-au3_pixelsearch-access-violation/
 * @see https://www.autoitscript.com/forum/topic/210967-autoitx-au3_pixelsearch-access-violation/#comment-1525551
 *
 * @param left The X coordinate of the left edge of the rectangle.
 * @param top The Y coordinate of the top edge of the rectangle.
 * @param right The X coordinate of the right edge of the rectangle.
 * @param bottom The Y coordinate of the bottom edge of the rectangle.
 * @param color The color to search for, in `0xRRGGBB` format.
 * @param shadeVariation The allowed variation in color shades (default is 0).
 * @param step The step value for the search (default is 1).
 *
 * @returns A promise that resolves to an {@linkcode IPoint} object with the coordinates of the found pixel.
 * If the pixel is not found, the promise resolves to a point with coordinates (-1, -1).
 *
 * @example
 * ```typescript
 * import { PixelSearch } from '@ahmic/autoit-js';
 *
 * const result = await PixelSearch(0, 0, 100, 100, 0xFF0000);
 *
 * console.log(result); // Output: { x: 50, y: 50 }
 * ```
 */
export async function PixelSearch(
  left: number,
  top: number,
  right: number,
  bottom: number,
  color: number,
  shadeVariation: number = 0,
  step: number = 1,
): Promise<IPoint> {
  const width = right - left;
  const height = bottom - top;

  const screenDeviceContext = await GetDC(null);
  const memoryDeviceContext = await CreateCompatibleDC(screenDeviceContext);
  const bitmap = await CreateCompatibleBitmap(screenDeviceContext, width, height);

  async function cleanup() {
    await DeleteObject(bitmap);
    await DeleteDC(memoryDeviceContext);
    await ReleaseDC(null, screenDeviceContext);
  }

  if (!(await SelectObject(memoryDeviceContext, bitmap))) {
    console.warn('SelectObject failed');
    await cleanup();

    return NOT_FOUND;
  }

  if (
    !(await BitBlt(
      memoryDeviceContext,
      0,
      0,
      width,
      height,
      screenDeviceContext,
      left,
      top,
      SRCCOPY | CAPTUREBLT,
    ))
  ) {
    console.warn('BitBlt failed');
    await cleanup();

    return NOT_FOUND;
  }

  const imageSize = width * height * 4;

  const bitmapInfoHeader = new BitmapInfoHeader({
    biWidth: width,
    biHeight: -height,
    biPlanes: 1,
    biBitCount: 32,
    biCompression: BI_RGB,
    biSizeImage: imageSize,
  });

  const bitmapInfo = new BitmapInfo({
    bmiHeader: bitmapInfoHeader,
    bmiColors: [{}],
  });

  const pixels = new Uint8Array(imageSize);

  const rows = await GetDIBits(memoryDeviceContext, bitmap, 0, height, pixels, bitmapInfo, 0);

  if (rows === 0) {
    console.warn('GetDIBits failed');
    await cleanup();

    return NOT_FOUND;
  }

  const result = search(color, left, top, width, height, step, shadeVariation, pixels);

  await cleanup();

  return result;
}

function withinTolerance(color: number, target: number, shadeVariation: number): boolean {
  return Math.abs(color - target) <= shadeVariation;
}

function search(
  color: number,
  left: number,
  top: number,
  width: number,
  height: number,
  step: number,
  shadeVariation: number,
  pixels: Uint8Array,
): IPoint {
  const targetR = (color >> 16) & 0xff;
  const targetG = (color >> 8) & 0xff;
  const targetB = color & 0xff;

  for (let row = 0; row < height; row += step) {
    const rowOffset = row * width * 4;

    for (let col = 0; col < width; col += step) {
      const offset = rowOffset + col * 4;

      const b = pixels[offset];
      const g = pixels[offset + 1];
      const r = pixels[offset + 2];

      if (
        withinTolerance(r, targetR, shadeVariation) &&
        withinTolerance(g, targetG, shadeVariation) &&
        withinTolerance(b, targetB, shadeVariation)
      ) {
        return new Point({ x: col + left, y: row + top });
      }
    }
  }

  return NOT_FOUND;
}
