import koffi from 'koffi';

import { LONG } from './win32';

export interface IRect {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

export class Rect implements IRect {
  left: number;
  top: number;
  right: number;
  bottom: number;

  constructor(options?: IRect) {
    this.left = options?.left ?? 0;
    this.top = options?.top ?? 0;
    this.right = options?.right ?? 0;
    this.bottom = options?.bottom ?? 0;
  }
}

export const RECT = koffi.struct('RECT', {
  left: LONG,
  top: LONG,
  right: LONG,
  bottom: LONG,
});

export const LPRECT = koffi.pointer('LPRECT', RECT);
