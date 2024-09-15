import { arch, platform } from 'node:os';
import { resolve } from 'node:path';

import koffi, { IKoffiCType, IKoffiLib, KoffiFunction } from 'koffi';

import { Logger } from '../util';
import { DataType, DataTypeToType, LPWSTR } from '../util/data-type';
import { TDWORD, THWND, TLPCWSTR, TLPPOINT, TLPRECT, TLPWSTR } from './types';

const AU3_INTDEFAULT = -2147483647;
const SW_SHOWNORMAL = 1;

export class AutoIt {
  private readonly path: string;
  private readonly logger: Logger;

  private lib: IKoffiLib | null = null;
  private loaded: boolean = false;
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

  // TODO: Implement
  AutoItSetOption(szOption: TLPCWSTR, nValue: number): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  ClipGet(szClip: TLPWSTR, nBufSize: number): void {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  ClipPut(szClip: TLPCWSTR): void {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  ControlClick(
    szTitle: TLPCWSTR,
    szText: TLPCWSTR,
    szControl: TLPCWSTR,
    szButton: TLPCWSTR,
    nNumClicks: number,
    nX: number = AU3_INTDEFAULT,
    nY: number = AU3_INTDEFAULT,
  ): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  ControlClickByHandle(
    hWnd: THWND,
    hCtrl: THWND,
    szButton: TLPCWSTR,
    nNumClicks: number,
    nX: number = AU3_INTDEFAULT,
    nY: number = AU3_INTDEFAULT,
  ): number {
    throw new Error('Unimplemented');
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

  // TODO: Implement
  ControlGetHandle(hWnd: THWND, szControl: TLPCWSTR): THWND {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  ControlGetHandleAsText(
    szTitle: TLPCWSTR,
    /*[in,defaultvalue("")]*/ szText: TLPCWSTR,
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
    /*[in,defaultvalue("")]*/ szUser: TLPCWSTR = '',
    /*[in,defaultvalue("")]*/ szPwd: TLPCWSTR = '',
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

  // TODO: Implement
  IsAdmin(): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  MouseClick(
    /*[in,defaultvalue("LEFT")]*/ szButton: TLPCWSTR,
    nX: number = AU3_INTDEFAULT,
    nY: number = AU3_INTDEFAULT,
    nClicks: number = 1,
    nSpeed: number = -1,
  ): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  MouseClickDrag(
    szButton: TLPCWSTR,
    nX1: number,
    nY1: number,
    nX2: number,
    nY2: number,
    nSpeed: number = -1,
  ): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  MouseDown(/*[in,defaultvalue("LEFT")]*/ szButton: TLPCWSTR): void {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  MouseGetCursor(): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  MouseGetPos(lpPoint: TLPPOINT): void {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  MouseMove(nX: number, nY: number, nSpeed: number = -1): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  MouseUp(/*[in,defaultvalue("LEFT")]*/ szButton: TLPCWSTR): void {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  MouseWheel(szDirection: TLPCWSTR, nClicks: number): void {
    throw new Error('Unimplemented');
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

  // TODO: Implement
  Run(
    szProgram: TLPCWSTR,
    /*[in,defaultvalue("")]*/ szDir: TLPCWSTR,
    nShowFlag: number = SW_SHOWNORMAL,
  ): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  RunWait(
    szProgram: TLPCWSTR,
    /*[in,defaultvalue("")]*/ szDir: TLPCWSTR,
    nShowFlag: number = SW_SHOWNORMAL,
  ): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  RunAs(
    szUser: TLPCWSTR,
    szDomain: TLPCWSTR,
    szPassword: TLPCWSTR,
    nLogonFlag: number,
    szProgram: TLPCWSTR,
    /*[in,defaultvalue("")]*/ szDir: TLPCWSTR,
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
    /*[in,defaultvalue("")]*/ szDir: TLPCWSTR,
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

  // TODO: Implement
  Sleep(nMilliseconds: number): void {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  StatusbarGetText(
    szTitle: TLPCWSTR,
    /*[in,defaultvalue("")]*/ szText: TLPCWSTR,
    /*[in,defaultvalue(1)]*/ nPart: number,
    szStatusText: TLPWSTR,
    nBufSize: number,
  ): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  StatusbarGetTextByHandle(
    hWnd: THWND,
    /*[in,defaultvalue(1)]*/ nPart: number,
    szStatusText: TLPWSTR,
    nBufSize: number,
  ): number {
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

  // TODO: Implement
  WinGetClassListByHandle(hWnd: THWND, szRetText: TLPWSTR, nBufSize: number): void {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  WinGetClientSize(szTitle: TLPCWSTR, /*[in,defaultvalue("")]*/ szText: TLPCWSTR, lpRect: TLPRECT): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  WinGetClientSizeByHandle(hWnd: THWND, lpRect: TLPRECT): number {
    throw new Error('Unimplemented');
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
  WinGetHandleAsText(
    szTitle: TLPCWSTR,
    /*[in,defaultvalue("")]*/ szText: TLPCWSTR,
    szRetText: TLPWSTR,
    nBufSize: number,
  ): void {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  WinGetPos(szTitle: TLPCWSTR, /*[in,defaultvalue("")]*/ szText: TLPCWSTR, lpRect: TLPRECT): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  WinGetPosByHandle(hWnd: THWND, lpRect: TLPRECT): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  WinGetProcess(szTitle: TLPCWSTR, /*[in,defaultvalue("")]*/ szText: TLPCWSTR): TDWORD {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  WinGetProcessByHandle(hWnd: THWND): TDWORD {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  WinGetState(szTitle: TLPCWSTR, /*[in,defaultvalue("")]*/ szText: TLPCWSTR): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  WinGetStateByHandle(hWnd: THWND): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  WinGetText(
    szTitle: TLPCWSTR,
    /*[in,defaultvalue("")]*/ szText: TLPCWSTR,
    szRetText: TLPWSTR,
    nBufSize: number,
  ): void {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  WinGetTextByHandle(hWnd: THWND, szRetText: TLPWSTR, nBufSize: number): void {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  WinGetTitle(
    szTitle: TLPCWSTR,
    /*[in,defaultvalue("")]*/ szText: TLPCWSTR,
    szRetText: TLPWSTR,
    nBufSize: number,
  ): void {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  WinGetTitleByHandle(hWnd: THWND, szRetText: TLPWSTR, nBufSize: number): void {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  WinKill(szTitle: TLPCWSTR, /*[in,defaultvalue("")]*/ szText: TLPCWSTR): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  WinKillByHandle(hWnd: THWND): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  WinMenuSelectItem(
    szTitle: TLPCWSTR,
    /*[in,defaultvalue("")]*/ szText: TLPCWSTR,
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
    /*[in,defaultvalue("")]*/ szText: TLPCWSTR,
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
  WinSetOnTop(szTitle: TLPCWSTR, /*[in,defaultvalue("")]*/ szText: TLPCWSTR, nFlag: number): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  WinSetOnTopByHandle(hWnd: THWND, nFlag: number): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  WinSetState(szTitle: TLPCWSTR, /*[in,defaultvalue("")]*/ szText: TLPCWSTR, nFlags: number): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  WinSetStateByHandle(hWnd: THWND, nFlags: number): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  WinSetTitle(szTitle: TLPCWSTR, /*[in,defaultvalue("")]*/ szText: TLPCWSTR, szNewTitle: TLPCWSTR): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  WinSetTitleByHandle(hWnd: THWND, szNewTitle: TLPCWSTR): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  WinSetTrans(szTitle: TLPCWSTR, /*[in,defaultvalue("")]*/ szText: TLPCWSTR, nTrans: number): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  WinSetTransByHandle(hWnd: THWND, nTrans: number): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  WinWait(szTitle: TLPCWSTR, /*[in,defaultvalue("")]*/ szText: TLPCWSTR, nTimeout: number = 0): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  WinWaitByHandle(hWnd: THWND, nTimeout: number): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  WinWaitActive(szTitle: TLPCWSTR, /*[in,defaultvalue("")]*/ szText: TLPCWSTR, nTimeout: number = 0): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  WinWaitActiveByHandle(hWnd: THWND, nTimeout: number): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  WinWaitClose(szTitle: TLPCWSTR, /*[in,defaultvalue("")]*/ szText: TLPCWSTR, nTimeout: number = 0): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  WinWaitCloseByHandle(hWnd: THWND, nTimeout: number): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  WinWaitNotActive(szTitle: TLPCWSTR, /*[in,defaultvalue("")]*/ szText: TLPCWSTR, nTimeout: number): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  WinWaitNotActiveByHandle(hWnd: THWND, nTimeout: number = 0): number {
    throw new Error('Unimplemented');
  }
}
