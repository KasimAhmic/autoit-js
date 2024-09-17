import { arch, platform } from 'node:os';
import { resolve } from 'node:path';

import koffi, { IKoffiCType, IKoffiLib, KoffiFunction } from 'koffi';

import { LPPOINT, LPRECT, LPWSTR, Logger, POINT, RECT } from '../util';
import { DataType, DataTypeToType } from '../util/data-type';
import { TDWORD, THWND, TLPCWSTR, TLPPOINT, TLPRECT, TLPWSTR } from './types/types';

const AU3_INTDEFAULT = -2147483647;
const SW_SHOWNORMAL = 1;

export class AutoIt {
  private readonly path: string;
  private readonly logger: Logger;

  private lib: IKoffiLib | null = null;
  private functionCache: Record<string, KoffiFunction> = {};

  constructor() {
    if (platform() !== 'win32') {
      throw new Error('AutoIt is only supported on Windows');
    }

    const archSuffix = arch() === 'x64' ? '_x64' : '';

    this.path = resolve(`${__dirname}/lib/AutoItX3${archSuffix}.dll`);
    this.logger = new Logger(this.constructor.name);
  }

  load() {
    if (this.lib) {
      this.logger.warn('AutoIt is already loaded');
    } else {
      this.logger.debug(`Loading AutoIt from ${this.path}`);

      this.lib = koffi.load(this.path);

      this.Init();

      this.logger.debug('AutoIt loaded');
    }
  }

  unload() {
    if (this.lib) {
      this.logger.debug(`Unloading AutoIt from ${this.path}`);

      this.lib.unload();

      this.logger.debug('AutoIt unloaded');

      this.lib = null;
    } else {
      this.logger.warn('AutoIt is already unloaded');
    }
  }

  get isLoaded(): boolean {
    return this.lib !== null;
  }

  // TODO: Caching the functions does lead to a "performance improvement", but it's such a small improvement
  // that it's probably not worth it. It's several orders of magnitude faster to retrieve the functions
  // from the cache than to recreate them each time, however that difference is between ~60ns and ~14,000 ns
  // (0.00006ms and 0.014ms). This was mostly done as I don't know if there is any issue with repeatedly
  // creating the same function over and over again from Koffi's perspective. Leaving it here for now until I
  // can reach out to the maintainer.
  private invoke<ReturnType extends DataType, const ParameterTypes extends (DataType | IKoffiCType)[]>(
    functionName: string,
    resultType: ReturnType,
    parameterTypes: ParameterTypes,
    parameters: { [K in keyof ParameterTypes]: DataTypeToType<ParameterTypes[K]> },
  ): DataTypeToType<ReturnType> {
    if (!this.lib) {
      throw new Error('You must call load() before invoking functions');
    }

    const cachedFunc = this.functionCache[functionName];

    if (cachedFunc) {
      return cachedFunc(...parameters);
    }

    const func = this.lib.func('__stdcall', functionName, resultType, parameterTypes);

    this.functionCache[functionName] = func;

    return func(...parameters);
  }

  /**
   * Calls the `AU3_error` function from the AutoItX3 library. Equivalent to the `@error` macro in AutoIt.
   */
  GetError(): number {
    return this.invoke('AU3_error', DataType.Int32, [], []);
  }

  /**
   * Calls the `AU3_Init` function from the AutoItX3 library. Note that this function is called automatically
   * when the library is loaded.
   *
   * @returns void
   */
  Init(): void {
    return this.invoke('AU3_Init', DataType.Void, [], []);
  }

  AutoItSetOption(szOption: TLPCWSTR, nValue: number): number {
    return this.invoke(
      'AU3_AutoItSetOption',
      DataType.Int32,
      [DataType.String16, DataType.Int32],
      [szOption, nValue],
    );
  }

  ClipGet(): string {
    const outputBuffer = Buffer.alloc(1024);

    this.invoke('AU3_ClipGet', DataType.Void, [LPWSTR, DataType.Int32], [outputBuffer, outputBuffer.length]);

    return outputBuffer.toString('utf16le');
  }

  ClipPut(szClip: TLPCWSTR): void {
    this.invoke('AU3_ClipPut', DataType.Void, [DataType.String16], [szClip]);
  }

  ControlClick(
    szTitle: TLPCWSTR,
    szText: TLPCWSTR,
    szControl: TLPCWSTR,
    szButton: TLPCWSTR,
    nNumClicks: number,
    nX: number = AU3_INTDEFAULT,
    nY: number = AU3_INTDEFAULT,
  ): number {
    return this.invoke(
      'AU3_ControlClick',
      DataType.Int32,
      [
        DataType.String16,
        DataType.String16,
        DataType.String16,
        DataType.String16,
        DataType.Int32,
        DataType.Int32,
        DataType.Int32,
      ],
      [szTitle, szText, szControl, szButton, nNumClicks, nX, nY],
    );
  }

  ControlClickByHandle(
    hWnd: THWND,
    hCtrl: THWND,
    szButton: TLPCWSTR,
    nNumClicks: number,
    nX: number = AU3_INTDEFAULT,
    nY: number = AU3_INTDEFAULT,
  ): number {
    return this.invoke(
      'AU3_ControlClickByHandle',
      DataType.Int32,
      [DataType.UInt64, DataType.UInt64, DataType.String16, DataType.Int32, DataType.Int32, DataType.Int32],
      [hWnd, hCtrl, szButton, nNumClicks, nX, nY],
    );
  }

  // TODO: Implement
  ControlCommand(
    szTitle: TLPCWSTR,
    szText: TLPCWSTR,
    szControl: TLPCWSTR,
    szCommand: TLPCWSTR,
    szExtra: TLPCWSTR,
    szResult: TLPWSTR,
    nBufSize: number,
  ): void {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  ControlCommandByHandle(
    hWnd: THWND,
    hCtrl: THWND,
    szCommand: TLPCWSTR,
    szExtra: TLPCWSTR,
    szResult: TLPWSTR,
    nBufSize: number,
  ): void {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  ControlListView(
    szTitle: TLPCWSTR,
    szText: TLPCWSTR,
    szControl: TLPCWSTR,
    szCommand: TLPCWSTR,
    szExtra1: TLPCWSTR,
    szExtra2: TLPCWSTR,
    szResult: TLPWSTR,
    nBufSize: number,
  ): void {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  ControlListViewByHandle(
    hWnd: THWND,
    hCtrl: THWND,
    szCommand: TLPCWSTR,
    szExtra1: TLPCWSTR,
    szExtra2: TLPCWSTR,
    szResult: TLPWSTR,
    nBufSize: number,
  ): void {
    throw new Error('Unimplemented');
  }

  ControlDisable(szTitle: TLPCWSTR, szText: TLPCWSTR, szControl: TLPCWSTR): number {
    return this.invoke(
      'AU3_ControlDisable',
      DataType.Int32,
      [DataType.String16, DataType.String16, DataType.String16],
      [szTitle, szText, szControl],
    );
  }

  ControlDisableByHandle(hWnd: THWND, hCtrl: THWND): number {
    return this.invoke(
      'AU3_ControlDisableByHandle',
      DataType.Int32,
      [DataType.UInt64, DataType.UInt64],
      [hWnd, hCtrl],
    );
  }

  ControlEnable(szTitle: TLPCWSTR, szText: TLPCWSTR, szControl: TLPCWSTR): number {
    return this.invoke(
      'AU3_ControlEnable',
      DataType.Int32,
      [DataType.String16, DataType.String16, DataType.String16],
      [szTitle, szText, szControl],
    );
  }

  ControlEnableByHandle(hWnd: THWND, hCtrl: THWND): number {
    return this.invoke(
      'AU3_ControlEnableByHandle',
      DataType.Int32,
      [DataType.UInt64, DataType.UInt64],
      [hWnd, hCtrl],
    );
  }

  ControlFocus(szTitle: TLPCWSTR, szText: TLPCWSTR, szControl: TLPCWSTR): number {
    return this.invoke(
      'AU3_ControlFocus',
      DataType.Int32,
      [DataType.String16, DataType.String16, DataType.String16],
      [szTitle, szText, szControl],
    );
  }

  ControlFocusByHandle(hWnd: THWND, hCtrl: THWND): number {
    return this.invoke(
      'AU3_ControlFocusByHandle',
      DataType.Int32,
      [DataType.UInt64, DataType.UInt64],
      [hWnd, hCtrl],
    );
  }

  ControlGetFocus(szTitle: TLPCWSTR, szText: TLPCWSTR): string {
    const outputBuffer = Buffer.alloc(1024);

    this.invoke(
      'AU3_ControlGetFocus',
      DataType.Void,
      [DataType.String16, DataType.String16, LPWSTR, DataType.Int32],
      [szTitle, szText, outputBuffer, outputBuffer.length],
    );

    return outputBuffer.toString('utf16le');
  }

  ControlGetFocusByHandle(hWnd: THWND): string {
    const outputBuffer = Buffer.alloc(1024);

    this.invoke(
      'AU3_ControlGetFocusByHandle',
      DataType.Void,
      [DataType.UInt64, LPWSTR, DataType.Int32],
      [hWnd, outputBuffer, outputBuffer.length],
    );

    return outputBuffer.toString('utf16le');
  }

  ControlGetHandle(hWnd: THWND, szControl: TLPCWSTR): THWND {
    return this.invoke(
      'AU3_ControlGetHandle',
      DataType.UInt64,
      [DataType.UInt64, DataType.String16],
      [hWnd, szControl],
    );
  }

  ControlGetHandleAsText(szTitle: TLPCWSTR, szText: TLPCWSTR = '', szControl: TLPCWSTR): string {
    const outputBuffer = Buffer.alloc(1024);

    this.invoke(
      'AU3_ControlGetHandleAsText',
      DataType.Void,
      [DataType.String16, DataType.String16, DataType.String16, LPWSTR, DataType.Int32],
      [szTitle, szText, szControl, outputBuffer, outputBuffer.length],
    );

    return outputBuffer.toString('utf16le');
  }

  ControlGetPos(szTitle: TLPCWSTR, szText: TLPCWSTR, szControl: TLPCWSTR): Rect {
    const rectBuffer = Buffer.alloc(koffi.sizeof(RECT));

    this.invoke(
      'AU3_ControlGetPos',
      DataType.Void,
      [DataType.String16, DataType.String16, DataType.String16, LPRECT],
      [szTitle, szText, szControl, rectBuffer],
    );

    return {
      left: rectBuffer.readInt32LE(0),
      top: rectBuffer.readInt32LE(4),
      right: rectBuffer.readInt32LE(8),
      bottom: rectBuffer.readInt32LE(12),
    };
  }

  ControlGetPosByHandle(hWnd: THWND, hCtrl: THWND): Rect {
    const rectBuffer = Buffer.alloc(koffi.sizeof(RECT));

    this.invoke(
      'AU3_ControlGetPosByHandle',
      DataType.Void,
      [DataType.UInt64, DataType.UInt64, LPRECT],
      [hWnd, hCtrl, rectBuffer],
    );

    return {
      left: rectBuffer.readInt32LE(0),
      top: rectBuffer.readInt32LE(4),
      right: rectBuffer.readInt32LE(8),
      bottom: rectBuffer.readInt32LE(12),
    };
  }

  ControlGetText(szTitle: TLPCWSTR, szText: TLPCWSTR, szControl: TLPCWSTR): string {
    const outputBuffer = Buffer.alloc(1024);

    this.invoke(
      'AU3_ControlGetText',
      DataType.Void,
      [DataType.String16, DataType.String16, DataType.String16, LPWSTR, DataType.Int32],
      [szTitle, szText, szControl, outputBuffer, outputBuffer.length],
    );

    return outputBuffer.toString('utf16le');
  }

  ControlGetTextByHandle(hWnd: THWND, hCtrl: THWND): string {
    const outputBuffer = Buffer.alloc(1024);

    this.invoke(
      'AU3_ControlGetTextByHandle',
      DataType.Void,
      [DataType.UInt64, DataType.UInt64, LPWSTR, DataType.Int32],
      [hWnd, hCtrl, outputBuffer, outputBuffer.length],
    );

    return outputBuffer.toString('utf16le');
  }

  ControlHide(szTitle: TLPCWSTR, szText: TLPCWSTR, szControl: TLPCWSTR): number {
    return this.invoke(
      'AU3_ControlHide',
      DataType.Int32,
      [DataType.String16, DataType.String16, DataType.String16],
      [szTitle, szText, szControl],
    );
  }

  ControlHideByHandle(hWnd: THWND, hCtrl: THWND): number {
    return this.invoke(
      'AU3_ControlHideByHandle',
      DataType.Int32,
      [DataType.UInt64, DataType.UInt64],
      [hWnd, hCtrl],
    );
  }

  ControlMove(
    szTitle: TLPCWSTR,
    szText: TLPCWSTR,
    szControl: TLPCWSTR,
    nX: number,
    nY: number,
    nWidth: number = -1,
    nHeight: number = -1,
  ): number {
    return this.invoke(
      'AU3_ControlMove',
      DataType.Int32,
      [
        DataType.String16,
        DataType.String16,
        DataType.String16,
        DataType.Int32,
        DataType.Int32,
        DataType.Int32,
        DataType.Int32,
      ],
      [szTitle, szText, szControl, nX, nY, nWidth, nHeight],
    );
  }

  ControlMoveByHandle(
    hWnd: THWND,
    hCtrl: THWND,
    nX: number,
    nY: number,
    nWidth: number = -1,
    nHeight: number = -1,
  ): number {
    return this.invoke(
      'AU3_ControlMoveByHandle',
      DataType.Int32,
      [DataType.UInt64, DataType.UInt64, DataType.Int32, DataType.Int32, DataType.Int32, DataType.Int32],
      [hWnd, hCtrl, nX, nY, nWidth, nHeight],
    );
  }

  ControlSend(
    szTitle: TLPCWSTR,
    szText: TLPCWSTR,
    szControl: TLPCWSTR,
    szSendText: TLPCWSTR,
    nMode: number = 0,
  ): number {
    return this.invoke(
      'AU3_ControlSend',
      DataType.Int32,
      [DataType.String16, DataType.String16, DataType.String16, DataType.String16, DataType.Int32],
      [szTitle, szText, szControl, szSendText, nMode],
    );
  }

  ControlSendByHandle(hWnd: THWND, hCtrl: THWND, szSendText: TLPCWSTR, nMode: number = 0): number {
    return this.invoke(
      'AU3_ControlSendByHandle',
      DataType.Int32,
      [DataType.UInt64, DataType.UInt64, DataType.String16, DataType.Int32],
      [hWnd, hCtrl, szSendText, nMode],
    );
  }

  ControlSetText(szTitle: TLPCWSTR, szText: TLPCWSTR, szControl: TLPCWSTR, szControlText: TLPCWSTR): number {
    return this.invoke(
      'AU3_ControlSetText',
      DataType.Int32,
      [DataType.String16, DataType.String16, DataType.String16, DataType.String16],
      [szTitle, szText, szControl, szControlText],
    );
  }

  // TODO: Implement
  ControlSetTextByHandle(hWnd: THWND, hCtrl: THWND, szControlText: TLPCWSTR): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  ControlShow(szTitle: TLPCWSTR, szText: TLPCWSTR, szControl: TLPCWSTR): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  ControlShowByHandle(hWnd: THWND, hCtrl: THWND): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  ControlTreeView(
    szTitle: TLPCWSTR,
    szText: TLPCWSTR,
    szControl: TLPCWSTR,
    szCommand: TLPCWSTR,
    szExtra1: TLPCWSTR,
    szExtra2: TLPCWSTR,
    szResult: TLPWSTR,
    nBufSize: number,
  ): void {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  ControlTreeViewByHandle(
    hWnd: THWND,
    hCtrl: THWND,
    szCommand: TLPCWSTR,
    szExtra1: TLPCWSTR,
    szExtra2: TLPCWSTR,
    szResult: TLPWSTR,
    nBufSize: number,
  ): void {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  DriveMapAdd(
    szDevice: TLPCWSTR,
    szShare: TLPCWSTR,
    nFlags: number,
    szUser: TLPCWSTR = '',
    szPwd: TLPCWSTR = '',
    szResult: TLPWSTR,
    nBufSize: number,
  ): void {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  DriveMapDel(szDevice: TLPCWSTR): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  DriveMapGet(szDevice: TLPCWSTR, szMapping: TLPWSTR, nBufSize: number): void {
    throw new Error('Unimplemented');
  }

  IsAdmin(): boolean {
    const result = this.invoke('AU3_IsAdmin', DataType.Int32, [], []);

    return result === 1;
  }

  MouseClick(
    szButton: TLPCWSTR = MouseButton.Left,
    nX: number = AU3_INTDEFAULT,
    nY: number = AU3_INTDEFAULT,
    nClicks: number = 1,
    nSpeed: number = -1,
  ): number {
    return this.invoke(
      'AU3_MouseClick',
      DataType.Int32,
      [DataType.String16, DataType.Int32, DataType.Int32, DataType.Int32, DataType.Int32],
      [szButton, nX, nY, nClicks, nSpeed],
    );
  }

  MouseClickDrag(
    szButton: TLPCWSTR,
    nX1: number,
    nY1: number,
    nX2: number,
    nY2: number,
    nSpeed: number = -1,
  ): number {
    return this.invoke(
      'AU3_MouseClickDrag',
      DataType.Int32,
      [DataType.String16, DataType.Int32, DataType.Int32, DataType.Int32, DataType.Int32, DataType.Int32],
      [szButton, nX1, nY1, nX2, nY2, nSpeed],
    );
  }

  MouseDown(szButton: TLPCWSTR = MouseButton.Left): void {
    this.invoke('AU3_MouseDown', DataType.Void, [DataType.String16], [szButton]);
  }

  MouseGetCursor(): number {
    return this.invoke('AU3_MouseGetCursor', DataType.Int32, [], []);
  }

  MouseGetPos(): Point {
    const output = Buffer.alloc(koffi.sizeof(POINT));

    this.invoke('AU3_MouseGetPos', DataType.Void, [LPPOINT], [output]);

    return {
      x: output.readInt32LE(0),
      y: output.readInt32LE(4),
    };
  }

  MouseMove(nX: number, nY: number, nSpeed: number = -1): number {
    return this.invoke(
      'AU3_MouseMove',
      DataType.Int32,
      [DataType.Int32, DataType.Int32, DataType.Int32],
      [nX, nY, nSpeed],
    );
  }

  MouseUp(szButton: TLPCWSTR = MouseButton.Left): void {
    this.invoke('AU3_MouseUp', DataType.Void, [DataType.String16], [szButton]);
  }

  MouseWheel(szDirection: TLPCWSTR, nClicks: number): void {
    this.invoke('AU3_MouseWheel', DataType.Void, [DataType.String16, DataType.Int32], [szDirection, nClicks]);
  }

  // TODO: Implement
  Opt(szOption: TLPCWSTR, nValue: number): number {
    throw new Error('Unimplemented');
  }

  PixelChecksum(left: number, top: number, right: number, bottom: number, nStep: number = 1): number {
    const rectBuffer = Buffer.alloc(koffi.sizeof(RECT));

    rectBuffer.writeInt32LE(left, 0);
    rectBuffer.writeInt32LE(top, 4);
    rectBuffer.writeInt32LE(right, 8);
    rectBuffer.writeInt32LE(bottom, 12);

    return this.invoke('AU3_PixelChecksum', DataType.Int32, [LPRECT, DataType.Int32], [rectBuffer, nStep]);
  }

  // TODO: Allow for returning hex values
  PixelGetColor(nX: number, nY: number): number {
    return this.invoke('AU3_PixelGetColor', DataType.Int32, [DataType.Int32, DataType.Int32], [nX, nY]);
  }

  // TODO: Seems to cause crashes when the left and top values are 0 - 2. Needs further investigation
  PixelSearch(
    left: number,
    top: number,
    right: number,
    bottom: number,
    nCol: number,
    nVar: number = 0,
    nStep: number = 1,
  ): Point {
    const rectBuffer = Buffer.alloc(koffi.sizeof(RECT));

    rectBuffer.writeInt32LE(left, 0);
    rectBuffer.writeInt32LE(top, 4);
    rectBuffer.writeInt32LE(right, 8);
    rectBuffer.writeInt32LE(bottom, 12);

    const outputBuffer = Buffer.alloc(koffi.sizeof(POINT));

    this.invoke(
      'AU3_PixelSearch',
      DataType.Void,
      [LPRECT, DataType.Int32, DataType.Int32, DataType.Int32, LPPOINT],
      [rectBuffer, nCol, nVar, nStep, outputBuffer],
    );

    return {
      x: outputBuffer.readInt32LE(0),
      y: outputBuffer.readInt32LE(4),
    };
  }

  ProcessClose(szProcess: TLPCWSTR): number {
    return this.invoke('AU3_ProcessClose', DataType.Int32, [DataType.String16], [szProcess]);
  }

  ProcessExists(szProcess: TLPCWSTR): number {
    return this.invoke('AU3_ProcessExists', DataType.Int32, [DataType.String16], [szProcess]);
  }

  // TODO: Implement
  ProcessSetPriority(szProcess: TLPCWSTR, nPriority: number): number {
    throw new Error('Unimplemented');
  }

  ProcessWait(szProcess: TLPCWSTR, nTimeout: number = 0): number {
    return this.invoke(
      'AU3_ProcessWait',
      DataType.Int32,
      [DataType.String16, DataType.Int32],
      [szProcess, nTimeout],
    );
  }

  ProcessWaitClose(szProcess: TLPCWSTR, nTimeout: number = 0): number {
    return this.invoke(
      'AU3_ProcessWaitClose',
      DataType.Int32,
      [DataType.String16, DataType.Int32],
      [szProcess, nTimeout],
    );
  }

  Run(szProgram: TLPCWSTR, szDir: TLPCWSTR = '', nShowFlag: number = SW_SHOWNORMAL): number {
    return this.invoke(
      'AU3_Run',
      DataType.Int32,
      [DataType.String16, DataType.String16, DataType.Int32],
      [szProgram, szDir, nShowFlag],
    );
  }

  RunWait(szProgram: TLPCWSTR, szDir: TLPCWSTR = '', nShowFlag: number = SW_SHOWNORMAL): number {
    return this.invoke(
      'AU3_RunWait',
      DataType.Int32,
      [DataType.String16, DataType.String16, DataType.Int32],
      [szProgram, szDir, nShowFlag],
    );
  }

  // TODO: Implement
  RunAs(
    szUser: TLPCWSTR,
    szDomain: TLPCWSTR,
    szPassword: TLPCWSTR,
    nLogonFlag: number,
    szProgram: TLPCWSTR,
    szDir: TLPCWSTR = '',
    nShowFlag: number = SW_SHOWNORMAL,
  ): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  RunAsWait(
    szUser: TLPCWSTR,
    szDomain: TLPCWSTR,
    szPassword: TLPCWSTR,
    nLogonFlag: number,
    szProgram: TLPCWSTR,
    szDir: TLPCWSTR = '',
    nShowFlag: number = SW_SHOWNORMAL,
  ): number {
    throw new Error('Unimplemented');
  }

  Send(szSendText: TLPCWSTR, nMode: number = 0): void {
    this.invoke('AU3_Send', DataType.Void, [DataType.String16, DataType.Int32], [szSendText, nMode]);
  }

  // TODO: Implement
  Shutdown(nFlags: number): number {
    throw new Error('Unimplemented');
  }

  Sleep(nMilliseconds: number): void {
    this.invoke('AU3_Sleep', DataType.Void, [DataType.Int32], [nMilliseconds]);
  }

  // TODO: Implement
  StatusbarGetText(
    szTitle: TLPCWSTR,
    szText: TLPCWSTR = '',
    nPart: number = 1,
    szStatusText: TLPWSTR,
    nBufSize: number,
  ): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  StatusbarGetTextByHandle(hWnd: THWND, nPart: number = 1, szStatusText: TLPWSTR, nBufSize: number): number {
    throw new Error('Unimplemented');
  }

  // TODO: Seemingly non-functional
  ToolTip(szTip: TLPCWSTR, nX: number = AU3_INTDEFAULT, nY: number = AU3_INTDEFAULT): number {
    return this.invoke(
      'AU3_ToolTip',
      DataType.Int32,
      [DataType.String16, DataType.Int32, DataType.Int32],
      [szTip, nX, nY],
    );
  }

  WinActivate(szTitle: TLPCWSTR, szText: TLPCWSTR = ''): number {
    return this.invoke(
      'AU3_WinActivate',
      DataType.Int,
      [DataType.String16, DataType.String16],
      [szTitle, szText],
    );
  }

  WinActivateByHandle(hWnd: THWND): number {
    return this.invoke('AU3_WinActivateByHandle', DataType.Int32, [DataType.UInt64], [hWnd]);
  }

  WinActive(szTitle: TLPCWSTR, szText: TLPCWSTR = ''): number {
    return this.invoke(
      'AU3_WinActive',
      DataType.Int,
      [DataType.String16, DataType.String16],
      [szTitle, szText],
    );
  }

  WinActiveByHandle(hWnd: THWND): number {
    return this.invoke('AU3_WinActiveByHandle', DataType.Int32, [DataType.UInt64], [hWnd]);
  }

  WinClose(szTitle: TLPCWSTR, szText: TLPCWSTR = ''): number {
    return this.invoke(
      'AU3_WinClose',
      DataType.Int32,
      [DataType.String16, DataType.String16],
      [szTitle, szText],
    );
  }

  WinCloseByHandle(hWnd: THWND): number {
    return this.invoke('AU3_WinCloseByHandle', DataType.Int32, [DataType.UInt64], [hWnd]);
  }

  WinExists(szTitle: TLPCWSTR, szText: TLPCWSTR = ''): boolean {
    const result = this.invoke(
      'AU3_WinExists',
      DataType.Int32,
      [DataType.String16, DataType.String16],
      [szTitle, szText],
    );

    return result === 1;
  }

  WinExistsByHandle(hWnd: THWND): boolean {
    const result = this.invoke('AU3_WinExistsByHandle', DataType.Int32, [DataType.UInt64], [hWnd]);

    return result === 1;
  }

  WinGetCaretPos(): Point {
    const outputBuffer = Buffer.alloc(koffi.sizeof(POINT));

    this.invoke('AU3_WinGetCaretPos', DataType.Void, [LPPOINT], [outputBuffer]);

    return {
      x: outputBuffer.readInt32LE(0),
      y: outputBuffer.readInt32LE(4),
    };
  }

  WinGetClassList(szTitle: TLPCWSTR, szText: TLPCWSTR = ''): string {
    const outputBuffer = Buffer.alloc(1024);

    this.invoke(
      'AU3_WinGetClassList',
      DataType.Void,
      [DataType.String16, DataType.String16, LPWSTR, DataType.Int32],
      [szTitle, szText, outputBuffer, outputBuffer.length],
    );

    return outputBuffer.toString('utf16le');
  }

  WinGetClassListByHandle(hWnd: THWND): string {
    const outputBuffer = Buffer.alloc(1024);

    this.invoke(
      'AU3_WinGetClassListByHandle',
      DataType.Void,
      [DataType.UInt64, LPWSTR, DataType.Int32],
      [hWnd, outputBuffer, outputBuffer.length],
    );

    return outputBuffer.toString('utf16le');
  }

  WinGetClientSize(szTitle: TLPCWSTR, szText: TLPCWSTR = ''): ClientSize {
    const outputBuffer = Buffer.alloc(koffi.sizeof(RECT));

    this.invoke(
      'AU3_WinGetClientSize',
      DataType.Void,
      [DataType.String16, DataType.String16, LPRECT],
      [szTitle, szText, outputBuffer],
    );

    return {
      width: outputBuffer.readInt32LE(8),
      height: outputBuffer.readInt32LE(12),
    };
  }

  WinGetClientSizeByHandle(hWnd: THWND): ClientSize {
    const outputBuffer = Buffer.alloc(koffi.sizeof(RECT));

    this.invoke(
      'AU3_WinGetClientSizeByHandle',
      DataType.Void,
      [DataType.UInt64, LPRECT],
      [hWnd, outputBuffer],
    );

    return {
      width: outputBuffer.readInt32LE(8),
      height: outputBuffer.readInt32LE(12),
    };
  }

  WinGetHandle(szTitle: TLPCWSTR, szText: TLPCWSTR = ''): THWND {
    return this.invoke(
      'AU3_WinGetHandle',
      DataType.UInt64,
      [DataType.String16, DataType.String16],
      [szTitle, szText],
    );
  }

  WinGetHandleAsText(szTitle: TLPCWSTR, szText: TLPCWSTR = ''): string {
    const outputBuffer = Buffer.alloc(1024);

    this.invoke(
      'AU3_WinGetHandleAsText',
      DataType.Void,
      [DataType.String16, DataType.String16, LPWSTR, DataType.Int32],
      [szTitle, szText, outputBuffer, outputBuffer.length],
    );

    return outputBuffer.toString('utf16le');
  }

  WinGetPos(szTitle: TLPCWSTR, szText: TLPCWSTR = ''): WinPositon {
    const outputBuffer = Buffer.alloc(koffi.sizeof(RECT));

    this.invoke(
      'AU3_WinGetPos',
      DataType.Void,
      [DataType.String16, DataType.String16, LPRECT],
      [szTitle, szText, outputBuffer],
    );

    return {
      x: outputBuffer.readInt32LE(0),
      y: outputBuffer.readInt32LE(4),
      width: outputBuffer.readInt32LE(8),
      height: outputBuffer.readInt32LE(12),
    };
  }

  WinGetPosByHandle(hWnd: THWND): WinPositon {
    const outputBuffer = Buffer.alloc(koffi.sizeof(RECT));

    this.invoke('AU3_WinGetPosByHandle', DataType.Void, [DataType.UInt64, LPRECT], [hWnd, outputBuffer]);

    return {
      x: outputBuffer.readInt32LE(0),
      y: outputBuffer.readInt32LE(4),
      width: outputBuffer.readInt32LE(8),
      height: outputBuffer.readInt32LE(12),
    };
  }

  WinGetProcess(szTitle: TLPCWSTR, szText: TLPCWSTR = ''): TDWORD {
    return this.invoke(
      'AU3_WinGetProcess',
      DataType.Int32,
      [DataType.String16, DataType.String16],
      [szTitle, szText],
    );
  }

  WinGetProcessByHandle(hWnd: THWND): TDWORD {
    return this.invoke('AU3_WinGetProcessByHandle', DataType.Int32, [DataType.UInt64], [hWnd]);
  }

  WinGetState(szTitle: TLPCWSTR, szText: TLPCWSTR = ''): WindowState {
    const state = this.invoke(
      'AU3_WinGetState',
      DataType.Int32,
      [DataType.String16, DataType.String16],
      [szTitle, szText],
    );

    return {
      exists: (state & WinState.Exists) === WinState.Exists,
      visible: (state & WinState.Visible) === WinState.Visible,
      enabled: (state & WinState.Enabled) === WinState.Enabled,
      active: (state & WinState.Active) === WinState.Active,
      minimized: (state & WinState.Minimized) === WinState.Minimized,
      maximized: (state & WinState.Maximized) === WinState.Maximized,
    };
  }

  WinGetStateByHandle(hWnd: THWND): WindowState {
    const state = this.invoke('AU3_WinGetStateByHandle', DataType.Int32, [DataType.UInt64], [hWnd]);

    return {
      exists: (state & WinState.Exists) === WinState.Exists,
      visible: (state & WinState.Visible) === WinState.Visible,
      enabled: (state & WinState.Enabled) === WinState.Enabled,
      active: (state & WinState.Active) === WinState.Active,
      minimized: (state & WinState.Minimized) === WinState.Minimized,
      maximized: (state & WinState.Maximized) === WinState.Maximized,
    };
  }

  WinGetText(szTitle: TLPCWSTR, szText: TLPCWSTR = ''): string {
    const outputBuffer = Buffer.alloc(1024);

    this.invoke(
      'AU3_WinGetText',
      DataType.Void,
      [DataType.String16, DataType.String16, LPWSTR, DataType.Int32],
      [szTitle, szText, outputBuffer, outputBuffer.length],
    );

    return outputBuffer.toString('utf16le');
  }

  WinGetTextByHandle(hWnd: THWND): string {
    const outputBuffer = Buffer.alloc(1024);

    this.invoke(
      'AU3_WinGetTextByHandle',
      DataType.Void,
      [DataType.UInt64, LPWSTR, DataType.Int32],
      [hWnd, outputBuffer, outputBuffer.length],
    );

    return outputBuffer.toString('utf16le');
  }

  WinGetTitle(szTitle: TLPCWSTR, szText: TLPCWSTR = ''): string {
    const outputBuffer = Buffer.alloc(1024);

    this.invoke(
      'AU3_WinGetTitle',
      DataType.Void,
      [DataType.String16, DataType.String16, LPWSTR, DataType.Int32],
      [szTitle, szText, outputBuffer, outputBuffer.length],
    );

    return outputBuffer.toString('utf16le');
  }

  WinGetTitleByHandle(hWnd: THWND): string {
    const outputBuffer = Buffer.alloc(1024);

    this.invoke(
      'AU3_WinGetTitleByHandle',
      DataType.Void,
      [DataType.UInt64, LPWSTR, DataType.Int32],
      [hWnd, outputBuffer, outputBuffer.length],
    );

    return outputBuffer.toString('utf16le');
  }

  WinKill(szTitle: TLPCWSTR, szText: TLPCWSTR = ''): number {
    return this.invoke(
      'AU3_WinKill',
      DataType.Int32,
      [DataType.String16, DataType.String16],
      [szTitle, szText],
    );
  }

  WinKillByHandle(hWnd: THWND): number {
    return this.invoke('AU3_WinKillByHandle', DataType.Int32, [DataType.UInt64], [hWnd]);
  }

  WinMenuSelectItem(
    szTitle: TLPCWSTR,
    szText: TLPCWSTR = '',
    szItem1: TLPCWSTR,
    szItem2: TLPCWSTR = '',
    szItem3: TLPCWSTR = '',
    szItem4: TLPCWSTR = '',
    szItem5: TLPCWSTR = '',
    szItem6: TLPCWSTR = '',
    szItem7: TLPCWSTR = '',
    szItem8: TLPCWSTR = '',
  ): number {
    return this.invoke(
      'AU3_WinMenuSelectItem',
      DataType.Int32,
      [
        DataType.String16,
        DataType.String16,
        DataType.String16,
        DataType.String16,
        DataType.String16,
        DataType.String16,
        DataType.String16,
        DataType.String16,
        DataType.String16,
        DataType.String16,
      ],
      [szTitle, szText, szItem1, szItem2, szItem3, szItem4, szItem5, szItem6, szItem7, szItem8],
    );
  }

  WinMenuSelectItemByHandle(
    hWnd: THWND,
    szItem1: TLPCWSTR,
    szItem2: TLPCWSTR = '',
    szItem3: TLPCWSTR = '',
    szItem4: TLPCWSTR = '',
    szItem5: TLPCWSTR = '',
    szItem6: TLPCWSTR = '',
    szItem7: TLPCWSTR = '',
    szItem8: TLPCWSTR = '',
  ): number {
    return this.invoke(
      'AU3_WinMenuSelectItemByHandle',
      DataType.Int32,
      [
        DataType.UInt64,
        DataType.String16,
        DataType.String16,
        DataType.String16,
        DataType.String16,
        DataType.String16,
        DataType.String16,
        DataType.String16,
        DataType.String16,
      ],
      [hWnd, szItem1, szItem2, szItem3, szItem4, szItem5, szItem6, szItem7, szItem8],
    );
  }

  WinMinimizeAll(): void {
    this.invoke('AU3_WinMinimizeAll', DataType.Void, [], []);
  }

  WinMinimizeAllUndo(): void {
    this.invoke('AU3_WinMinimizeAllUndo', DataType.Void, [], []);
  }

  WinMove(
    szTitle: TLPCWSTR,
    szText: TLPCWSTR = '',
    nX: number,
    nY: number,
    nWidth: number = -1,
    nHeight: number = -1,
  ): number {
    return this.invoke(
      'AU3_WinMove',
      DataType.Int32,
      [DataType.String16, DataType.String16, DataType.Int32, DataType.Int32, DataType.Int32, DataType.Int32],
      [szTitle, szText, nX, nY, nWidth, nHeight],
    );
  }

  WinMoveByHandle(hWnd: THWND, nX: number, nY: number, nWidth: number = -1, nHeight: number = -1): number {
    return this.invoke(
      'AU3_WinMoveByHandle',
      DataType.Int32,
      [DataType.UInt64, DataType.Int32, DataType.Int32, DataType.Int32, DataType.Int32],
      [hWnd, nX, nY, nWidth, nHeight],
    );
  }

  WinSetOnTop(szTitle: TLPCWSTR, szText: TLPCWSTR = '', nFlag: number): number {
    return this.invoke(
      'AU3_WinSetOnTop',
      DataType.Int32,
      [DataType.String16, DataType.String16, DataType.Int32],
      [szTitle, szText, nFlag],
    );
  }

  WinSetOnTopByHandle(hWnd: THWND, nFlag: number): number {
    return this.invoke(
      'AU3_WinSetOnTopByHandle',
      DataType.Int32,
      [DataType.UInt64, DataType.Int32],
      [hWnd, nFlag],
    );
  }

  WinSetState(szTitle: TLPCWSTR, szText: TLPCWSTR = '', nFlags: number): number {
    return this.invoke(
      'AU3_WinSetState',
      DataType.Int32,
      [DataType.String16, DataType.String16, DataType.Int32],
      [szTitle, szText, nFlags],
    );
  }

  WinSetStateByHandle(hWnd: THWND, nFlags: number): number {
    return this.invoke(
      'AU3_WinSetStateByHandle',
      DataType.Int32,
      [DataType.UInt64, DataType.Int32],
      [hWnd, nFlags],
    );
  }

  WinSetTitle(szTitle: TLPCWSTR, szText: TLPCWSTR = '', szNewTitle: TLPCWSTR): number {
    return this.invoke(
      'AU3_WinSetTitle',
      DataType.Int32,
      [DataType.String16, DataType.String16, DataType.String16],
      [szTitle, szText, szNewTitle],
    );
  }

  WinSetTitleByHandle(hWnd: THWND, szNewTitle: TLPCWSTR): number {
    return this.invoke(
      'AU3_WinSetTitleByHandle',
      DataType.Int32,
      [DataType.UInt64, DataType.String16],
      [hWnd, szNewTitle],
    );
  }

  WinSetTrans(szTitle: TLPCWSTR, szText: TLPCWSTR = '', nTrans: number): number {
    return this.invoke(
      'AU3_WinSetTrans',
      DataType.Int32,
      [DataType.String16, DataType.String16, DataType.Int32],
      [szTitle, szText, nTrans],
    );
  }

  WinSetTransByHandle(hWnd: THWND, nTrans: number): number {
    return this.invoke(
      'AU3_WinSetTransByHandle',
      DataType.Int32,
      [DataType.UInt64, DataType.Int32],
      [hWnd, nTrans],
    );
  }

  WinWait(szTitle: TLPCWSTR, szText: TLPCWSTR = '', nTimeout: number = 0): number {
    return this.invoke(
      'AU3_WinWait',
      DataType.Int32,
      [DataType.String16, DataType.String16, DataType.Int32],
      [szTitle, szText, nTimeout],
    );
  }

  WinWaitByHandle(hWnd: THWND, nTimeout: number): number {
    return this.invoke(
      'AU3_WinWaitByHandle',
      DataType.Int32,
      [DataType.UInt64, DataType.Int32],
      [hWnd, nTimeout],
    );
  }

  WinWaitActive(szTitle: TLPCWSTR, szText: TLPCWSTR = '', nTimeout: number = 0): number {
    return this.invoke(
      'AU3_WinWaitActive',
      DataType.Int32,
      [DataType.String16, DataType.String16, DataType.Int32],
      [szTitle, szText, nTimeout],
    );
  }

  WinWaitActiveByHandle(hWnd: THWND, nTimeout: number): number {
    return this.invoke(
      'AU3_WinWaitActiveByHandle',
      DataType.Int32,
      [DataType.UInt64, DataType.Int32],
      [hWnd, nTimeout],
    );
  }

  WinWaitClose(szTitle: TLPCWSTR, szText: TLPCWSTR = '', nTimeout: number = 0): number {
    return this.invoke(
      'AU3_WinWaitClose',
      DataType.Int32,
      [DataType.String16, DataType.String16, DataType.Int32],
      [szTitle, szText, nTimeout],
    );
  }

  WinWaitCloseByHandle(hWnd: THWND, nTimeout: number): number {
    return this.invoke(
      'AU3_WinWaitCloseByHandle',
      DataType.Int32,
      [DataType.UInt64, DataType.Int32],
      [hWnd, nTimeout],
    );
  }

  WinWaitNotActive(szTitle: TLPCWSTR, szText: TLPCWSTR = '', nTimeout: number): number {
    return this.invoke(
      'AU3_WinWaitNotActive',
      DataType.Int32,
      [DataType.String16, DataType.String16, DataType.Int32],
      [szTitle, szText, nTimeout],
    );
  }

  WinWaitNotActiveByHandle(hWnd: THWND, nTimeout: number = 0): number {
    return this.invoke(
      'AU3_WinWaitNotActiveByHandle',
      DataType.Int32,
      [DataType.UInt64, DataType.Int32],
      [hWnd, nTimeout],
    );
  }
}

export type Point = {
  x: number;
  y: number;
};

export enum MouseButton {
  Left = 'LEFT',
  Middle = 'MIDDLE',
  Right = 'RIGHT',
}

export enum MouseWheelDirection {
  Down = 'DOWN',
  Up = 'UP',
}

export type ClientSize = {
  width: number;
  height: number;
};

export enum WinVisibility {
  Hide,
  ShowNormal,
  ShowMinimized,
  Maximize,
  ShownNoActivate,
  Show,
  Minimize,
  Enable,
  Disable,
  Restore,
  ShowDefault,
  ForceMinimize,
}

export type WinPositon = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export enum WinState {
  Exists = 1,
  Visible = 2,
  Enabled = 4,
  Active = 8,
  Minimized = 16,
  Maximized = 32,
}

export type WindowState = {
  exists: boolean;
  visible: boolean;
  enabled: boolean;
  active: boolean;
  minimized: boolean;
  maximized: boolean;
};

export type Rect = {
  left: number;
  top: number;
  right: number;
  bottom: number;
};
