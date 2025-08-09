import koffi from 'koffi';

import {
  BOOL,
  BitmapHandle,
  Bool,
  DWORD,
  DeviceContextHandle,
  DoubleWord,
  HBITMAP,
  HDC,
  INT,
  Int,
  LPVOID,
  LongPointerToVoid,
  UINT,
  UnsignedInt,
} from '../@types';
import { IBitmapInfo, LPBITMAPINFO } from '../@types/bitmap-info';
import { typedPromisify } from '../util';

const gdi32 = koffi.load('gdi32.dll');

export const BitBltSync: koffi.KoffiFunc<
  (
    hdc: DeviceContextHandle,
    x: Int,
    y: Int,
    cx: Int,
    cy: Int,
    hrdSrc: DeviceContextHandle,
    x1: Int,
    y1: Int,
    rop: DoubleWord,
  ) => boolean
> = gdi32.func('__stdcall', 'BitBlt', BOOL, [HDC, INT, INT, INT, INT, HDC, INT, INT, DWORD]);

export const CreateCompatibleDCSync: koffi.KoffiFunc<
  (deviceContextHandle: DeviceContextHandle) => DeviceContextHandle
> = gdi32.func('__stdcall', 'CreateCompatibleDC', HDC, [HDC]);

export const CreateCompatibleBitmapSync: koffi.KoffiFunc<
  (deviceContextHandle: DeviceContextHandle, width: Int, height: Int) => BitmapHandle
> = gdi32.func('__stdcall', 'CreateCompatibleBitmap', HBITMAP, [HDC, INT, INT]);

export const GetDIBitsSync: koffi.KoffiFunc<
  (
    hdc: DeviceContextHandle,
    hbitmap: BitmapHandle,
    start: UnsignedInt,
    cLines: UnsignedInt,
    lpvBits: LongPointerToVoid | Buffer | Uint8Array,
    lpbi: IBitmapInfo,
    usage: UnsignedInt,
  ) => Int
> = gdi32.func('__stdcall', 'GetDIBits', INT, [
  HDC,
  HBITMAP,
  UINT,
  UINT,
  koffi.out(LPVOID),
  koffi.inout(LPBITMAPINFO),
  UINT,
]);

export const SelectObjectSync: koffi.KoffiFunc<
  (deviceContextHandle: DeviceContextHandle, bitmapHandle: BitmapHandle) => BitmapHandle
> = gdi32.func('__stdcall', 'SelectObject', HBITMAP, [HDC, HBITMAP]);

export const DeleteObjectSync: koffi.KoffiFunc<(bitmapHandle: BitmapHandle) => Bool> = gdi32.func(
  '__stdcall',
  'DeleteObject',
  BOOL,
  [HBITMAP],
);

export const DeleteDCSync: koffi.KoffiFunc<(deviceContextHandle: DeviceContextHandle) => Bool> = gdi32.func(
  '__stdcall',
  'DeleteDC',
  BOOL,
  [HDC],
);

export const BitBlt = typedPromisify(BitBltSync.async);
export const CreateCompatibleDC = typedPromisify(CreateCompatibleDCSync.async);
export const CreateCompatibleBitmap = typedPromisify(CreateCompatibleBitmapSync.async);
export const GetDIBits = typedPromisify(GetDIBitsSync.async);
export const SelectObject = typedPromisify(SelectObjectSync.async);
export const DeleteObject = typedPromisify(DeleteObjectSync.async);
export const DeleteDC = typedPromisify(DeleteDCSync.async);
