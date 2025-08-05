import koffi from 'koffi';

import { typedPromisify } from '../util';
import { DWORD, DoubleWord, VOID } from './win32';

const kernel32 = koffi.load('kernel32.dll');

// Named WinSleep to avoid name collisions with AutoIt's Sleep function.
export const WinSleepSync: koffi.KoffiFunc<(milliseconds: DoubleWord) => void> = kernel32.func(
  '__stdcall',
  'Sleep',
  VOID,
  [DWORD],
);

export const WinSleep = typedPromisify(WinSleepSync.async);
