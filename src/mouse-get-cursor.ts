import { INT } from './@types';
import { autoit } from './lib/autoit';

/**
 * Enumeration of mouse cursor types.
 *
 * @see https://learn.microsoft.com/en-us/windows/win32/menurc/about-cursors
 */
export enum Cursor {
  /** Unknown cursor type. */
  Unknown = -1,

  /** Hand cursor. Depicted as a hand with a single finger pointing. */
  Hand = 0,

  /** App starting cursor. Depicted as an arrow with a spinning wheel or hourglass. */
  AppStarting = 1,

  /** Arrow cursor. Depicted as a standard arrow pointer. */
  Arrow = 2,

  /** Cross cursor. Depicted as a crosshair or plus sign. */
  Cross = 3,

  /** Help cursor. Depicted as an arrow with a question mark. */
  Help = 4,

  /** I-beam cursor. Depicted as a vertical line, typically used for text selection. */
  IBeam = 5,

  /**
   * Icon cursor. Exact depiction is unknown.
   *
   * @deprecated Obsolete for applications marked version 4.0 or later
   */
  Icon = 6,

  /** No cursor. Depicted as a circle with a line through it. */
  No = 7,

  /**
   * Size all cursor (all directions). Depicted as a cross with arrows pointing in all directions.
   *
   * @deprecated Obsolete for applications marked version 4.0 or later
   */
  Size = 8,

  /** Size all cursor (all directions). Depicted as a cross with arrows pointing in all directions. */
  SizeAll = 9,

  /** Size cursor (north-east, south-west). Depicted as a diagonal double-headed arrow. */
  SizeNorthEastSouthWest = 10,

  /** Size cursor (north, south). Depicted as a vertical double-headed arrow. */
  SizeNorthSouth = 11,

  /** Size cursor (north-west, south-east). Depicted as a diagonal double-headed arrow. */
  SizeNorthWestSouthEast = 12,

  /** Size cursor (west, east). Depicted as a horizontal double-headed arrow. */
  SizeWestEast = 13,

  /** Up arrow cursor. Depicted as an arrow pointing upwards. */
  UpArrow = 14,

  /** Wait cursor. Depicted as an hourglass or spinning wheel. */
  Wait = 15,

  /** No cursor (not set). Depicted as a blank or empty cursor. */
  None = 16,
}

/**
 * Retrieves the current mouse cursor ID.
 *
 * @returns The ID of the current mouse cursor.
 *
 * @example
 * ```typescript
 * import { MouseGetCursor } from '@ahmic/autoit-js';
 *
 * const cursorId = MouseGetCursor();
 *
 * console.log(cursorId); // Output: 2
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/MouseGetCursor.htm
 */
export function MouseGetCursor(): Cursor {
  return autoit.invoke('AU3_MouseGetCursor', INT, [], []);
}
