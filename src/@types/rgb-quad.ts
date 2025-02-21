import koffi from 'koffi';

import { BYTE, Byte } from './win32';

export interface IRgbQuad {
  rgbBlue?: Byte;
  rgbGreen?: Byte;
  rgbRed?: Byte;
  rgbReserved?: Byte;
}

export class RgbQuad implements IRgbQuad {
  rgbBlue?: Byte;
  rgbGreen?: Byte;
  rgbRed?: Byte;
  rgbReserved?: Byte;

  constructor(options: IRgbQuad) {
    this.rgbBlue = options.rgbBlue;
    this.rgbGreen = options.rgbGreen;
    this.rgbRed = options.rgbRed;
    this.rgbReserved = options.rgbReserved;
  }
}

export const RGBQUAD = koffi.struct('RGBQUAD', {
  rgbBlue: BYTE,
  rgbGreen: BYTE,
  rgbRed: BYTE,
  rgbReserved: BYTE,
});
