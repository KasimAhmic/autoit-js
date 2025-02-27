import koffi from 'koffi';

import { DWORD, DoubleWord, VOID } from './win32';

const kernel32 = koffi.load('kernel32.dll');

// Named WinSleep to avoid name collisions with AutoIt's Sleep function.
export const WinSleep: koffi.KoffiFunc<(milliseconds: DoubleWord) => void> = kernel32.func(
  '__stdcall',
  'Sleep',
  VOID,
  [DWORD],
);
