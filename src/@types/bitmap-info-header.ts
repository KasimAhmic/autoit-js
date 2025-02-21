import koffi from 'koffi';

import { DWORD, DoubleWord, LONG, Long, WORD, Word } from './win32';

export interface IBitmapInfoHeader {
  biSize?: DoubleWord;
  biWidth?: Long;
  biHeight?: Long;
  biPlanes?: Word;
  biBitCount?: Word;
  biCompression?: DoubleWord;
  biSizeImage?: DoubleWord;
  biXPelsPerMeter?: Long;
  biYPelsPerMeter?: Long;
  biClrUsed?: DoubleWord;
  biClrImportant?: DoubleWord;
}

export class BitmapInfoHeader implements IBitmapInfoHeader {
  biSize?: DoubleWord;
  biWidth?: Long;
  biHeight?: Long;
  biPlanes?: Word;
  biBitCount?: Word;
  biCompression?: DoubleWord;
  biSizeImage?: DoubleWord;
  biXPelsPerMeter?: Long;
  biYPelsPerMeter?: Long;
  biClrUsed?: DoubleWord;
  biClrImportant?: DoubleWord;

  constructor(options: Omit<IBitmapInfoHeader, 'biSize'>) {
    this.biSize = koffi.sizeof(BITMAPINFOHEADER);
    this.biWidth = options.biWidth;
    this.biHeight = options.biHeight;
    this.biPlanes = options.biPlanes;
    this.biBitCount = options.biBitCount;
    this.biCompression = options.biCompression;
    this.biSizeImage = options.biSizeImage;
    this.biXPelsPerMeter = options.biXPelsPerMeter;
    this.biYPelsPerMeter = options.biYPelsPerMeter;
    this.biClrUsed = options.biClrUsed;
    this.biClrImportant = options.biClrImportant;
  }
}

export const BITMAPINFOHEADER = koffi.struct('BITMAPINFOHEADER', {
  biSize: DWORD,
  biWidth: LONG,
  biHeight: LONG,
  biPlanes: WORD,
  biBitCount: WORD,
  biCompression: DWORD,
  biSizeImage: DWORD,
  biXPelsPerMeter: LONG,
  biYPelsPerMeter: LONG,
  biClrUsed: DWORD,
  biClrImportant: DWORD,
});

export const LPBITMAPINFOHEADER = koffi.pointer('LPBITMAPINFOHEADER', BITMAPINFOHEADER);
