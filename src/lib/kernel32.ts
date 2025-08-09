import koffi from 'koffi';

import { DWORD, DoubleWord, VOID } from '../@types/win32';
import { typedPromisify } from '../util';

const kernel32 = koffi.load('kernel32.dll');

// Named WinSleep to avoid name collisions with AutoIt's Sleep function.
export const WinSleepSync: koffi.KoffiFunc<(milliseconds: DoubleWord) => void> = kernel32.func(
  '__stdcall',
  'Sleep',
  VOID,
  [DWORD],
);

export const WinSleep = typedPromisify(WinSleepSync.async);
