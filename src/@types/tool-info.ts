import koffi from 'koffi';

import { IRect, RECT } from './rect';
import {
  HINSTANCE,
  HWND,
  InstanceHandle,
  LPARAM,
  LPVOID,
  LPWSTR,
  LongParam,
  LongPointerToWideString,
  UINT,
  UINT_PTR,
  UnsignedInt,
  UnsignedIntPointer,
  WindowHandle,
} from './win32';

export interface IToolInfoW {
  readonly cbSize: UnsignedInt;
  uFlags?: UnsignedInt;
  hwnd?: WindowHandle | null;
  uId?: UnsignedIntPointer;
  rect?: IRect;
  hinst?: InstanceHandle | null;
  lpszText: LongPointerToWideString | null;
  lParam?: LongParam;
  lpReserved?: null;
}

export class ToolInfoW implements IToolInfoW {
  readonly cbSize: UnsignedInt;
  uFlags?: UnsignedInt;
  hwnd?: WindowHandle | null;
  uId?: UnsignedIntPointer;
  rect?: IRect;
  hinst?: InstanceHandle | null;
  lpszText: LongPointerToWideString | null;
  lParam?: LongParam;
  readonly lpReserved: null;

  constructor(options?: Partial<Omit<IToolInfoW, 'cbSize' | 'lpReserved'>>) {
    // TODO: This is wrong. TOOLINFOW has a size of 72 bytes but it refuses to work when setting it to 72.
    this.cbSize = 40;
    this.uFlags = options?.uFlags;
    this.hwnd = options?.hwnd;
    this.uId = options?.uId;
    this.rect = options?.rect;
    this.hinst = options?.hinst;
    this.lpszText = options?.lpszText ?? '';
    this.lParam = options?.lParam;
    this.lpReserved = null;
  }
}

export const TOOLINFOW = koffi.pack('TOOLINFOW', {
  cbSize: UINT,
  uFlags: UINT,
  hwnd: HWND,
  uId: UINT_PTR,
  rect: RECT,
  hinst: HINSTANCE,
  lpszText: LPWSTR,
  lParam: LPARAM,
  lpReserved: LPVOID,
});

export const LPTOOLINFOW = koffi.pointer('LPTOOLINFOW', TOOLINFOW);
