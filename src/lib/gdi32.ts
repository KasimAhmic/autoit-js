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

const gdi32 = koffi.load('gdi32.dll');

export const BitBlt: koffi.KoffiFunc<
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

export const CreateCompatibleDC: koffi.KoffiFunc<
  (deviceContextHandle: DeviceContextHandle) => DeviceContextHandle
> = gdi32.func('__stdcall', 'CreateCompatibleDC', HDC, [HDC]);

export const CreateCompatibleBitmap: koffi.KoffiFunc<
  (deviceContextHandle: DeviceContextHandle, width: Int, height: Int) => BitmapHandle
> = gdi32.func('__stdcall', 'CreateCompatibleBitmap', HBITMAP, [HDC, INT, INT]);

export const GetDIBits: koffi.KoffiFunc<
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

export const SelectObject: koffi.KoffiFunc<
  (deviceContextHandle: DeviceContextHandle, bitmapHandle: BitmapHandle) => BitmapHandle
> = gdi32.func('__stdcall', 'SelectObject', HBITMAP, [HDC, HBITMAP]);

export const DeleteObject: koffi.KoffiFunc<(bitmapHandle: BitmapHandle) => Bool> = gdi32.func(
  '__stdcall',
  'DeleteObject',
  BOOL,
  [HBITMAP],
);

export const DeleteDC: koffi.KoffiFunc<(deviceContextHandle: DeviceContextHandle) => Bool> = gdi32.func(
  '__stdcall',
  'DeleteDC',
  BOOL,
  [HDC],
);
