import { IPoint, Point } from './@types';
import { BitmapInfo } from './@types/bitmap-info';
import { BitmapInfoHeader } from './@types/bitmap-info-header';
import {
  BitBlt,
  CreateCompatibleBitmap,
  CreateCompatibleDC,
  DeleteDC,
  DeleteObject,
  GetDIBits,
  SelectObject,
} from './lib/gdi32';
import { GetDC, ReleaseDC } from './lib/user32';

const SRCCOPY = 0x00cc0020;
const CAPTUREBLT = 0x40000000;
const BI_RGB = 0x00000000;

const NOT_FOUND = new Point({ x: -1, y: -1 });

function withinTolerance(component: number, target: number, shadeVariation: number): boolean {
  return Math.abs(component - target) <= shadeVariation;
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
 * @param left
 * @param top
 * @param right
 * @param bottom
 * @param color
 * @param shadeVariation
 * @param step
 *
 * @returns
 */
export function PixelSearch(
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

  const screenDeviceContext = GetDC(null);
  const memoryDeviceContext = CreateCompatibleDC(screenDeviceContext);
  const bitmap = CreateCompatibleBitmap(screenDeviceContext, width, height);

  function cleanup() {
    DeleteObject(bitmap);
    DeleteDC(memoryDeviceContext);
    ReleaseDC(null, screenDeviceContext);
  }

  if (!SelectObject(memoryDeviceContext, bitmap)) {
    console.warn('SelectObject failed');
    cleanup();

    return NOT_FOUND;
  }

  if (
    !BitBlt(memoryDeviceContext, 0, 0, width, height, screenDeviceContext, left, top, SRCCOPY | CAPTUREBLT)
  ) {
    console.warn('BitBlt failed');
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

  const rows = GetDIBits(memoryDeviceContext, bitmap, 0, height, pixels, bitmapInfo, 0);

  if (rows === 0) {
    console.warn('GetDIBits failed');
    cleanup();

    return NOT_FOUND;
  }

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
        cleanup();

        return new Point({ x: col + left, y: row + top });
      }
    }
  }

  cleanup();

  return NOT_FOUND;
}
