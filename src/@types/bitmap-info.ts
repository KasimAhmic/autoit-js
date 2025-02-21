import koffi from 'koffi';

import { BITMAPINFOHEADER, IBitmapInfoHeader } from './bitmap-info-header';
import { IRgbQuad, RGBQUAD } from './rgb-quad';

export interface IBitmapInfo {
  bmiHeader: IBitmapInfoHeader;
  bmiColors: IRgbQuad[];
}

export class BitmapInfo implements IBitmapInfo {
  bmiHeader: IBitmapInfoHeader;
  bmiColors: IRgbQuad[];

  constructor(options: IBitmapInfo) {
    this.bmiHeader = options.bmiHeader;
    this.bmiColors = options.bmiColors;
  }
}

export const BITMAPINFO = koffi.struct('BITMAPINFO', {
  bmiHeader: BITMAPINFOHEADER,
  bmiColors: koffi.array(RGBQUAD, 1),
});

export const LPBITMAPINFO = koffi.pointer('LPBITMAPINFO', BITMAPINFO);
