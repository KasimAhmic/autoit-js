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
import { typedPromisify } from '../util';

const user32 = koffi.load('user32.dll');

export function MAKELPARAM(low: number, high: number): number {
  return (low & 0xffff) | ((high & 0xffff) << 16);
}

export const GetDCSync: koffi.KoffiFunc<(windowHandle: WindowHandle | null) => DeviceContextHandle> =
  user32.func('__stdcall', 'GetDC', HDC, [HWND]);

export const ReleaseDCSync: koffi.KoffiFunc<
  (windowHandle: WindowHandle | null, deviceContextHandle: DeviceContextHandle) => Int
> = user32.func('__stdcall', 'ReleaseDC', INT, [HWND, HDC]);

export const CreateWindowExWSync: koffi.KoffiFunc<
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

export const SendMessageWSync: koffi.KoffiFunc<
  (windowHandle: WindowHandle, message: UnsignedInt, wParam: WordParam, lParam: LongParam) => LongResult
> = user32.func('__stdcall', 'SendMessageW', LRESULT, [HWND, UINT, WPARAM, LPARAM]);

export const DestroyWindowSync: koffi.KoffiFunc<(windowHandle: WindowHandle) => Bool> = user32.func(
  '__stdcall',
  'DestroyWindow',
  BOOL,
  [HWND],
);

export const GetDC = typedPromisify(GetDCSync.async);
export const ReleaseDC = typedPromisify(ReleaseDCSync.async);
export const CreateWindowExW = typedPromisify(CreateWindowExWSync.async);
export const SendMessageW = typedPromisify(SendMessageWSync.async);
export const DestroyWindow = typedPromisify(DestroyWindowSync.async);
