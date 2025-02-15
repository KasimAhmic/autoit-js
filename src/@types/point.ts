import koffi from 'koffi';

import { LONG } from './win32';

export interface IPoint {
  x: number;
  y: number;
}

export class Point implements IPoint {
  x: number;
  y: number;

  constructor(options?: IPoint) {
    this.x = options?.x ?? 0;
    this.y = options?.y ?? 0;
  }
}

export const POINT = koffi.struct('POINT', {
  x: LONG,
  y: LONG,
});

export const LPPOINT = koffi.pointer('LPPOINT', POINT);
