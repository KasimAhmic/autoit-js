import { arch, platform } from 'node:os';
import { resolve } from 'node:path';

import koffi, { IKoffiCType, IKoffiLib, KoffiFunction } from 'koffi';

import { LPOINT, LPPOINT, LPRECT, LPWSTR, LRECT, Logger } from '../util';
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

    const func = this.lib.func(functionName, resultType, parameterTypes);

    this.functionCache[functionName] = func;

    return func(...parameters);
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

  // TODO: Implement
  ControlDisable(szTitle: TLPCWSTR, szText: TLPCWSTR, szControl: TLPCWSTR): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  ControlDisableByHandle(hWnd: THWND, hCtrl: THWND): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  ControlEnable(szTitle: TLPCWSTR, szText: TLPCWSTR, szControl: TLPCWSTR): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  ControlEnableByHandle(hWnd: THWND, hCtrl: THWND): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  ControlFocus(szTitle: TLPCWSTR, szText: TLPCWSTR, szControl: TLPCWSTR): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  ControlFocusByHandle(hWnd: THWND, hCtrl: THWND): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  ControlGetFocus(szTitle: TLPCWSTR, szText: TLPCWSTR, szControlWithFocus: TLPWSTR, nBufSize: number): void {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  ControlGetFocusByHandle(hWnd: THWND, szControlWithFocus: TLPWSTR, nBufSize: number): void {
    throw new Error('Unimplemented');
  }

  ControlGetHandle(hWnd: THWND, szControl: TLPCWSTR): THWND {
    return this.invoke(
      'AU3_ControlGetHandle',
      DataType.UInt64,
      [DataType.UInt64, DataType.String16],
      [hWnd, szControl],
    );
  }

  // TODO: Implement
  ControlGetHandleAsText(
    szTitle: TLPCWSTR,
    szText: TLPCWSTR = '',
    szControl: TLPCWSTR,
    szRetText: TLPWSTR,
    nBufSize: number,
  ): void {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  ControlGetPos(szTitle: TLPCWSTR, szText: TLPCWSTR, szControl: TLPCWSTR, lpRect: TLPRECT): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  ControlGetPosByHandle(hWnd: THWND, hCtrl: THWND, lpRect: TLPRECT): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  ControlGetText(
    szTitle: TLPCWSTR,
    szText: TLPCWSTR,
    szControl: TLPCWSTR,
    szControlText: TLPWSTR,
    nBufSize: number,
  ): void {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  ControlGetTextByHandle(hWnd: THWND, hCtrl: THWND, szControlText: TLPWSTR, nBufSize: number): void {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  ControlHide(szTitle: TLPCWSTR, szText: TLPCWSTR, szControl: TLPCWSTR): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  ControlHideByHandle(hWnd: THWND, hCtrl: THWND): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  ControlMove(
    szTitle: TLPCWSTR,
    szText: TLPCWSTR,
    szControl: TLPCWSTR,
    nX: number,
    nY: number,
    nWidth: number = -1,
    nHeight: number = -1,
  ): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  ControlMoveByHandle(
    hWnd: THWND,
    hCtrl: THWND,
    nX: number,
    nY: number,
    nWidth: number = -1,
    nHeight: number = -1,
  ): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  ControlSend(
    szTitle: TLPCWSTR,
    szText: TLPCWSTR,
    szControl: TLPCWSTR,
    szSendText: TLPCWSTR,
    nMode: number = 0,
  ): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  ControlSendByHandle(hWnd: THWND, hCtrl: THWND, szSendText: TLPCWSTR, nMode: number = 0): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  ControlSetText(szTitle: TLPCWSTR, szText: TLPCWSTR, szControl: TLPCWSTR, szControlText: TLPCWSTR): number {
    throw new Error('Unimplemented');
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

  // TODO: Implement
  MouseGetCursor(): number {
    throw new Error('Unimplemented');
  }

  MouseGetPos(): MousePosition {
    const output = Buffer.alloc(koffi.sizeof(LPOINT));

    this.invoke('AU3_MouseGetPos', DataType.Void, [LPPOINT], [output]);

    const x = output.readInt32LE(0);
    const y = output.readInt32LE(4);

    return { x, y };
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

  // TODO: Implement
  PixelChecksum(lpRect: TLPRECT, nStep: number = 1): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  PixelGetColor(nX: number, nY: number): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  PixelSearch(
    lpRect: TLPRECT,
    nCol: number,
    /*default 0*/ nVar: number,
    /*default 1*/ nStep: number,
    pPointResult: TLPPOINT,
  ): void {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  ProcessClose(szProcess: TLPCWSTR): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  ProcessExists(szProcess: TLPCWSTR): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  ProcessSetPriority(szProcess: TLPCWSTR, nPriority: number): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  ProcessWait(szProcess: TLPCWSTR, nTimeout: number = 0): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  ProcessWaitClose(szProcess: TLPCWSTR, nTimeout: number = 0): number {
    throw new Error('Unimplemented');
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

  // TODO: Implement
  Send(szSendText: TLPCWSTR, nMode: number = 0): void {
    throw new Error('Unimplemented');
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

  // TODO: Implement
  ToolTip(szTip: TLPCWSTR, nX: number = AU3_INTDEFAULT, nY: number = AU3_INTDEFAULT): void {
    throw new Error('Unimplemented');
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

  // TODO: Implement
  WinGetCaretPos(lpPoint: TLPPOINT): number {
    throw new Error('Unimplemented');
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
    const outputBuffer = Buffer.alloc(koffi.sizeof(LRECT));

    this.invoke(
      'AU3_WinGetClientSize',
      DataType.Void,
      [DataType.String16, DataType.String16, LPRECT],
      [szTitle, szText, outputBuffer],
    );

    const width = outputBuffer.readInt32LE(8);
    const height = outputBuffer.readInt32LE(12);

    return { width, height };
  }

  WinGetClientSizeByHandle(hWnd: THWND): ClientSize {
    const outputBuffer = Buffer.alloc(koffi.sizeof(LRECT));

    this.invoke(
      'AU3_WinGetClientSizeByHandle',
      DataType.Void,
      [DataType.UInt64, LPRECT],
      [hWnd, outputBuffer],
    );

    const width = outputBuffer.readInt32LE(8);
    const height = outputBuffer.readInt32LE(12);

    return { width, height };
  }

  WinGetHandle(szTitle: TLPCWSTR, szText: TLPCWSTR = ''): THWND {
    return this.invoke(
      'AU3_WinGetHandle',
      DataType.UInt64,
      [DataType.String16, DataType.String16],
      [szTitle, szText],
    );
  }

  // TODO: Implement
  WinGetHandleAsText(szTitle: TLPCWSTR, szText: TLPCWSTR = '', szRetText: TLPWSTR, nBufSize: number): void {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  WinGetPos(szTitle: TLPCWSTR, szText: TLPCWSTR = '', lpRect: TLPRECT): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  WinGetPosByHandle(hWnd: THWND, lpRect: TLPRECT): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  WinGetProcess(szTitle: TLPCWSTR, szText: TLPCWSTR = ''): TDWORD {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  WinGetProcessByHandle(hWnd: THWND): TDWORD {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  WinGetState(szTitle: TLPCWSTR, szText: TLPCWSTR = ''): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  WinGetStateByHandle(hWnd: THWND): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  WinGetText(szTitle: TLPCWSTR, szText: TLPCWSTR = '', szRetText: TLPWSTR, nBufSize: number): void {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  WinGetTextByHandle(hWnd: THWND, szRetText: TLPWSTR, nBufSize: number): void {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  WinGetTitle(szTitle: TLPCWSTR, szText: TLPCWSTR = '', szRetText: TLPWSTR, nBufSize: number): void {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  WinGetTitleByHandle(hWnd: THWND, szRetText: TLPWSTR, nBufSize: number): void {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  WinKill(szTitle: TLPCWSTR, szText: TLPCWSTR = ''): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  WinKillByHandle(hWnd: THWND): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  WinMenuSelectItem(
    szTitle: TLPCWSTR,
    szText: TLPCWSTR = '',
    szItem1: TLPCWSTR,
    szItem2: TLPCWSTR,
    szItem3: TLPCWSTR,
    szItem4: TLPCWSTR,
    szItem5: TLPCWSTR,
    szItem6: TLPCWSTR,
    szItem7: TLPCWSTR,
    szItem8: TLPCWSTR,
  ): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  WinMenuSelectItemByHandle(
    hWnd: THWND,
    szItem1: TLPCWSTR,
    szItem2: TLPCWSTR,
    szItem3: TLPCWSTR,
    szItem4: TLPCWSTR,
    szItem5: TLPCWSTR,
    szItem6: TLPCWSTR,
    szItem7: TLPCWSTR,
    szItem8: TLPCWSTR,
  ): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  WinMinimizeAll(): void {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  WinMinimizeAllUndo(): void {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  WinMove(
    szTitle: TLPCWSTR,
    szText: TLPCWSTR = '',
    nX: number,
    nY: number,
    nWidth: number = -1,
    nHeight: number = -1,
  ): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  WinMoveByHandle(hWnd: THWND, nX: number, nY: number, nWidth: number = -1, nHeight: number = -1): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  WinSetOnTop(szTitle: TLPCWSTR, szText: TLPCWSTR = '', nFlag: number): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  WinSetOnTopByHandle(hWnd: THWND, nFlag: number): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  WinSetState(szTitle: TLPCWSTR, szText: TLPCWSTR = '', nFlags: number): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  WinSetStateByHandle(hWnd: THWND, nFlags: number): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  WinSetTitle(szTitle: TLPCWSTR, szText: TLPCWSTR = '', szNewTitle: TLPCWSTR): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  WinSetTitleByHandle(hWnd: THWND, szNewTitle: TLPCWSTR): number {
    throw new Error('Unimplemented');
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

  // TODO: Implement
  WinWaitNotActiveByHandle(hWnd: THWND, nTimeout: number = 0): number {
    throw new Error('Unimplemented');
  }
}

export type MousePosition = {
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
