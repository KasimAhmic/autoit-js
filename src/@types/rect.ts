import koffi from 'koffi';

import { LONG } from './win32';

/**
 * Represents a rectangle with coordinates for the left, top, right, and bottom edges.
 */
export interface IRect {
  /**
   * The left coordinate of the rectangle. Can be used as the X coordinate of the window/control.
   */
  left: number;

  /**
   * The top coordinate of the rectangle. Can be used as the Y coordinate of the window/control.
   */
  top: number;

  /**
   * The right coordinate of the rectangle. Can be used as the width of the window/control.
   */
  right: number;

  /**
   * The bottom coordinate of the rectangle. Can be used as the height of the window/control.
   */
  bottom: number;
}

/**
 * Serves as a `RECT` struct compatible object.
 *
 * @see https://learn.microsoft.com/en-us/windows/win32/api/windef/ns-windef-rect
 */
export class Rect implements IRect {
  left: number;
  top: number;
  right: number;
  bottom: number;

  /**
   * Creates a new Rect object with the specified coordinates.
   *
   * @param rect The coordinates of the rectangle. All properties default to 0.
   */
  constructor(rect?: Partial<IRect>) {
    this.left = rect?.left ?? 0;
    this.top = rect?.top ?? 0;
    this.right = rect?.right ?? 0;
    this.bottom = rect?.bottom ?? 0;
  }
}

export const RECT = koffi.struct('RECT', {
  left: LONG,
  top: LONG,
  right: LONG,
  bottom: LONG,
});

export const LPRECT = koffi.pointer('LPRECT', RECT);
