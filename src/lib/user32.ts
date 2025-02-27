import koffi from 'koffi';

import {
  BOOL,
  Bool,
  DWORD,
  DeviceContextHandle,
  DoubleWord,
  HDC,
  HINSTANCE,
  HMENU,
  HWND,
  INT,
  InstanceHandle,
  Int,
  LPARAM,
  LPCWSTR,
  LPVOID,
  LRESULT,
  LongParam,
  LongPointerToConstantWideString,
  LongPointerToVoid,
  LongResult,
  MenuHandle,
  UINT,
  UnsignedInt,
  WPARAM,
  WindowHandle,
  WordParam,
} from '../@types';

const user32 = koffi.load('user32.dll');

export const GetDC: koffi.KoffiFunc<(windowHandle: WindowHandle | null) => DeviceContextHandle> = user32.func(
  '__stdcall',
  'GetDC',
  HDC,
  [HWND],
);

export const ReleaseDC: koffi.KoffiFunc<
  (windowHandle: WindowHandle | null, deviceContextHandle: DeviceContextHandle) => Int
> = user32.func('__stdcall', 'ReleaseDC', INT, [HWND, HDC]);

export const CreateWindowExW: koffi.KoffiFunc<
  (
    extendedWindowStyle: DoubleWord,
    className: LongPointerToConstantWideString | null,
    windowName: LongPointerToConstantWideString | null,
    style: DoubleWord,
    xPosition: Int,
    yPosition: Int,
    width: Int,
    height: Int,
    parentWindowHandle: WindowHandle | null,
    menuHandle: MenuHandle | null,
    instanceHandle: InstanceHandle | null,
    param: LongPointerToVoid | null,
  ) => WindowHandle
> = user32.func('__stdcall', 'CreateWindowExW', HWND, [
  DWORD,
  LPCWSTR,
  LPCWSTR,
  DWORD,
  INT,
  INT,
  INT,
  INT,
  HWND,
  HMENU,
  HINSTANCE,
  LPVOID,
]);

export const SendMessageW: koffi.KoffiFunc<
  (windowHandle: WindowHandle, message: UnsignedInt, wParam: WordParam, lParam: LongParam) => LongResult
> = user32.func('__stdcall', 'SendMessageW', LRESULT, [HWND, UINT, WPARAM, LPARAM]);

export const DestroyWindow: koffi.KoffiFunc<(windowHandle: WindowHandle) => Bool> = user32.func(
  '__stdcall',
  'DestroyWindow',
  BOOL,
  [HWND],
);
