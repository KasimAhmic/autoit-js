import { INT } from './@types';
import { autoit } from './lib/autoit';

export enum Cursor {
  Unknown = -1,
  Hand = 0,
  AppStarting = 1,
  Arrow = 2,
  Cross = 3,
  Help = 4,
  IBeam = 5,
  Icon = 6,
  No = 7,
  Size = 8,
  SizeAll = 9,
  SizeNorthEastSouthWest = 10,
  SizeNorthSouth = 11,
  SizeNorthWestSouthEast = 12,
  SizeWestEast = 13,
  UpArrow = 14,
  Wait = 15,
  None = 16,
}

export function MouseGetCursor(): Cursor {
  return autoit.invoke('AU3_MouseGetCursor', INT, [], []);
}
