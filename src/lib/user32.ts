import koffi from 'koffi';

import { DeviceContextHandle, HDC, HWND, INT, Int, WindowHandle } from '../@types';

const user32 = koffi.load('user32.dll');

export const GetDC: koffi.KoffiFunc<(windowHandle: WindowHandle | null) => DeviceContextHandle> = user32.func(
  'GetDC',
  HDC,
  [HWND],
);

export const ReleaseDC: koffi.KoffiFunc<
  (windowHandle: WindowHandle | null, deviceContextHandle: DeviceContextHandle) => Int
> = user32.func('ReleaseDC', INT, [HWND, HDC]);
