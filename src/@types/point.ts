import koffi from 'koffi';

import { LONG } from './win32';

export interface IPoint {
  /**
   * The X coordinate of the point.
   */
  x: number;

  /**
   * The Y coordinate of the point.
   */
  y: number;
}

export class Point implements IPoint {
  x: number;
  y: number;

  /**
   * Creates a new Point object with the specified coordinates. Serves as a `POINT` struct compatible object.
   *
   * @param point The coordinates of the point. All properties default to 0.
   *
   * @see https://learn.microsoft.com/en-us/windows/win32/api/windef/ns-windef-point
   */
  constructor(point?: IPoint) {
    this.x = point?.x ?? 0;
    this.y = point?.y ?? 0;
  }
}

export const POINT = koffi.struct('POINT', {
  x: LONG,
  y: LONG,
});

export const LPPOINT = koffi.pointer('LPPOINT', POINT);
