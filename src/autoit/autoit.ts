import { arch, platform } from 'node:os';
import { resolve } from 'node:path';

import { Library } from '../util';
import { DataType, LPWSTR } from '../util/data-type';

const AU3_INTDEFAULT = -2147483647;
const SW_SHOWNORMAL = 1;

export class AutoIt extends Library {
  static readonly name: string = 'AutoItX3';

  constructor() {
    if (platform() !== 'win32') {
      throw new Error('AutoIt is only supported on Windows');
    }

    const archSuffix = arch() === 'x64' ? '_x64' : '';
    const dllPath = resolve(`${__dirname}/lib/AutoItX3${archSuffix}.dll`);

    super(AutoIt.name, dllPath);
  }

  postLoad(): void {
    this.Init();
  }

  /**
   * Calls the `AU3_Init` function from the AutoItX3 library. Note that this function is called automatically
   * when the library is loaded.
   *
   * @returns void
   */
  Init(): void {
    return this.call('AU3_Init', DataType.Void, [], []);
  }

  // TODO: Implement
  AutoItSetOption(szOption: LPCWSTR, nValue: number): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  ClipGet(szClip: LPWSTR, nBufSize: number): void {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  ClipPut(szClip: LPCWSTR): void {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  ControlClick(
    szTitle: LPCWSTR,
    szText: LPCWSTR,
    szControl: LPCWSTR,
    szButton: LPCWSTR,
    nNumClicks: number,
    nX: number = AU3_INTDEFAULT,
    nY: number = AU3_INTDEFAULT,
  ): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  ControlClickByHandle(
    hWnd: HWND,
    hCtrl: HWND,
    szButton: LPCWSTR,
    nNumClicks: number,
    nX: number = AU3_INTDEFAULT,
    nY: number = AU3_INTDEFAULT,
  ): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  ControlCommand(
    szTitle: LPCWSTR,
    szText: LPCWSTR,
    szControl: LPCWSTR,
    szCommand: LPCWSTR,
    szExtra: LPCWSTR,
    szResult: LPWSTR,
    nBufSize: number,
  ): void {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  ControlCommandByHandle(
    hWnd: HWND,
    hCtrl: HWND,
    szCommand: LPCWSTR,
    szExtra: LPCWSTR,
    szResult: LPWSTR,
    nBufSize: number,
  ): void {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  ControlListView(
    szTitle: LPCWSTR,
    szText: LPCWSTR,
    szControl: LPCWSTR,
    szCommand: LPCWSTR,
    szExtra1: LPCWSTR,
    szExtra2: LPCWSTR,
    szResult: LPWSTR,
    nBufSize: number,
  ): void {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  ControlListViewByHandle(
    hWnd: HWND,
    hCtrl: HWND,
    szCommand: LPCWSTR,
    szExtra1: LPCWSTR,
    szExtra2: LPCWSTR,
    szResult: LPWSTR,
    nBufSize: number,
  ): void {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  ControlDisable(szTitle: LPCWSTR, szText: LPCWSTR, szControl: LPCWSTR): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  ControlDisableByHandle(hWnd: HWND, hCtrl: HWND): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  ControlEnable(szTitle: LPCWSTR, szText: LPCWSTR, szControl: LPCWSTR): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  ControlEnableByHandle(hWnd: HWND, hCtrl: HWND): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  ControlFocus(szTitle: LPCWSTR, szText: LPCWSTR, szControl: LPCWSTR): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  ControlFocusByHandle(hWnd: HWND, hCtrl: HWND): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  ControlGetFocus(szTitle: LPCWSTR, szText: LPCWSTR, szControlWithFocus: LPWSTR, nBufSize: number): void {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  ControlGetFocusByHandle(hWnd: HWND, szControlWithFocus: LPWSTR, nBufSize: number): void {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  ControlGetHandle(hWnd: HWND, szControl: LPCWSTR): HWND {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  ControlGetHandleAsText(
    szTitle: LPCWSTR,
    /*[in,defaultvalue("")]*/ szText: LPCWSTR,
    szControl: LPCWSTR,
    szRetText: LPWSTR,
    nBufSize: number,
  ): void {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  ControlGetPos(szTitle: LPCWSTR, szText: LPCWSTR, szControl: LPCWSTR, lpRect: LPRECT): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  ControlGetPosByHandle(hWnd: HWND, hCtrl: HWND, lpRect: LPRECT): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  ControlGetText(
    szTitle: LPCWSTR,
    szText: LPCWSTR,
    szControl: LPCWSTR,
    szControlText: LPWSTR,
    nBufSize: number,
  ): void {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  ControlGetTextByHandle(hWnd: HWND, hCtrl: HWND, szControlText: LPWSTR, nBufSize: number): void {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  ControlHide(szTitle: LPCWSTR, szText: LPCWSTR, szControl: LPCWSTR): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  ControlHideByHandle(hWnd: HWND, hCtrl: HWND): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  ControlMove(
    szTitle: LPCWSTR,
    szText: LPCWSTR,
    szControl: LPCWSTR,
    nX: number,
    nY: number,
    nWidth: number = -1,
    nHeight: number = -1,
  ): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  ControlMoveByHandle(
    hWnd: HWND,
    hCtrl: HWND,
    nX: number,
    nY: number,
    nWidth: number = -1,
    nHeight: number = -1,
  ): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  ControlSend(
    szTitle: LPCWSTR,
    szText: LPCWSTR,
    szControl: LPCWSTR,
    szSendText: LPCWSTR,
    nMode: number = 0,
  ): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  ControlSendByHandle(hWnd: HWND, hCtrl: HWND, szSendText: LPCWSTR, nMode: number = 0): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  ControlSetText(szTitle: LPCWSTR, szText: LPCWSTR, szControl: LPCWSTR, szControlText: LPCWSTR): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  ControlSetTextByHandle(hWnd: HWND, hCtrl: HWND, szControlText: LPCWSTR): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  ControlShow(szTitle: LPCWSTR, szText: LPCWSTR, szControl: LPCWSTR): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  ControlShowByHandle(hWnd: HWND, hCtrl: HWND): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  ControlTreeView(
    szTitle: LPCWSTR,
    szText: LPCWSTR,
    szControl: LPCWSTR,
    szCommand: LPCWSTR,
    szExtra1: LPCWSTR,
    szExtra2: LPCWSTR,
    szResult: LPWSTR,
    nBufSize: number,
  ): void {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  ControlTreeViewByHandle(
    hWnd: HWND,
    hCtrl: HWND,
    szCommand: LPCWSTR,
    szExtra1: LPCWSTR,
    szExtra2: LPCWSTR,
    szResult: LPWSTR,
    nBufSize: number,
  ): void {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  DriveMapAdd(
    szDevice: LPCWSTR,
    szShare: LPCWSTR,
    nFlags: number,
    /*[in,defaultvalue("")]*/ szUser: LPCWSTR = '',
    /*[in,defaultvalue("")]*/ szPwd: LPCWSTR = '',
    szResult: LPWSTR,
    nBufSize: number,
  ): void {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  DriveMapDel(szDevice: LPCWSTR): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  DriveMapGet(szDevice: LPCWSTR, szMapping: LPWSTR, nBufSize: number): void {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  IsAdmin(): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  MouseClick(
    /*[in,defaultvalue("LEFT")]*/ szButton: LPCWSTR,
    nX: number = AU3_INTDEFAULT,
    nY: number = AU3_INTDEFAULT,
    nClicks: number = 1,
    nSpeed: number = -1,
  ): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  MouseClickDrag(
    szButton: LPCWSTR,
    nX1: number,
    nY1: number,
    nX2: number,
    nY2: number,
    nSpeed: number = -1,
  ): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  MouseDown(/*[in,defaultvalue("LEFT")]*/ szButton: LPCWSTR): void {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  MouseGetCursor(): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  MouseGetPos(lpPoint: LPPOINT): void {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  MouseMove(nX: number, nY: number, nSpeed: number = -1): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  MouseUp(/*[in,defaultvalue("LEFT")]*/ szButton: LPCWSTR): void {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  MouseWheel(szDirection: LPCWSTR, nClicks: number): void {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  Opt(szOption: LPCWSTR, nValue: number): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  PixelChecksum(lpRect: LPRECT, nStep: number = 1): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  PixelGetColor(nX: number, nY: number): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  PixelSearch(
    lpRect: LPRECT,
    nCol: number,
    /*default 0*/ nVar: number,
    /*default 1*/ nStep: number,
    pPointResult: LPPOINT,
  ): void {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  ProcessClose(szProcess: LPCWSTR): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  ProcessExists(szProcess: LPCWSTR): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  ProcessSetPriority(szProcess: LPCWSTR, nPriority: number): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  ProcessWait(szProcess: LPCWSTR, nTimeout: number = 0): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  ProcessWaitClose(szProcess: LPCWSTR, nTimeout: number = 0): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  Run(
    szProgram: LPCWSTR,
    /*[in,defaultvalue("")]*/ szDir: LPCWSTR,
    nShowFlag: number = SW_SHOWNORMAL,
  ): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  RunWait(
    szProgram: LPCWSTR,
    /*[in,defaultvalue("")]*/ szDir: LPCWSTR,
    nShowFlag: number = SW_SHOWNORMAL,
  ): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  RunAs(
    szUser: LPCWSTR,
    szDomain: LPCWSTR,
    szPassword: LPCWSTR,
    nLogonFlag: number,
    szProgram: LPCWSTR,
    /*[in,defaultvalue("")]*/ szDir: LPCWSTR,
    nShowFlag: number = SW_SHOWNORMAL,
  ): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  RunAsWait(
    szUser: LPCWSTR,
    szDomain: LPCWSTR,
    szPassword: LPCWSTR,
    nLogonFlag: number,
    szProgram: LPCWSTR,
    /*[in,defaultvalue("")]*/ szDir: LPCWSTR,
    nShowFlag: number = SW_SHOWNORMAL,
  ): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  Send(szSendText: LPCWSTR, nMode: number = 0): void {
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
    szTitle: LPCWSTR,
    /*[in,defaultvalue("")]*/ szText: LPCWSTR,
    /*[in,defaultvalue(1)]*/ nPart: number,
    szStatusText: LPWSTR,
    nBufSize: number,
  ): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  StatusbarGetTextByHandle(
    hWnd: HWND,
    /*[in,defaultvalue(1)]*/ nPart: number,
    szStatusText: LPWSTR,
    nBufSize: number,
  ): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  ToolTip(szTip: LPCWSTR, nX: number = AU3_INTDEFAULT, nY: number = AU3_INTDEFAULT): void {
    throw new Error('Unimplemented');
  }

  WinActivate(szTitle: LPCWSTR, szText: LPCWSTR = ''): number {
    return this.call(
      'AU3_WinActivate',
      DataType.Int,
      [DataType.String16, DataType.String16],
      [szTitle, szText],
    );
  }

  WinActivateByHandle(hWnd: HWND): number {
    return this.call('AU3_WinActivateByHandle', DataType.Int32, [DataType.UInt64], [hWnd]);
  }

  WinActive(szTitle: LPCWSTR, szText: LPCWSTR = ''): number {
    return this.call(
      'AU3_WinActive',
      DataType.Int,
      [DataType.String16, DataType.String16],
      [szTitle, szText],
    );
  }

  WinActiveByHandle(hWnd: HWND): number {
    return this.call('AU3_WinActiveByHandle', DataType.Int32, [DataType.UInt64], [hWnd]);
  }

  WinClose(szTitle: LPCWSTR, szText: LPCWSTR = ''): number {
    return this.call(
      'AU3_WinClose',
      DataType.Int32,
      [DataType.String16, DataType.String16],
      [szTitle, szText],
    );
  }

  WinCloseByHandle(hWnd: HWND): number {
    return this.call('AU3_WinCloseByHandle', DataType.Int32, [DataType.UInt64], [hWnd]);
  }

  WinExists(szTitle: LPCWSTR, szText: LPCWSTR = ''): boolean {
    const result = this.call(
      'AU3_WinExists',
      DataType.Int32,
      [DataType.String16, DataType.String16],
      [szTitle, szText],
    );

    return result === 1;
  }

  WinExistsByHandle(hWnd: HWND): boolean {
    const result = this.call('AU3_WinExistsByHandle', DataType.Int32, [DataType.UInt64], [hWnd]);

    return result === 1;
  }

  // TODO: Implement
  WinGetCaretPos(lpPoint: LPPOINT): number {
    throw new Error('Unimplemented');
  }

  WinGetClassList(szTitle: LPCWSTR, szText: LPCWSTR = ''): string {
    const outputBuffer = Buffer.alloc(1024);

    this.call(
      'AU3_WinGetClassList',
      DataType.Void,
      [DataType.String16, DataType.String16, LPWSTR, DataType.Int32],
      [szTitle, szText, outputBuffer, outputBuffer.length],
    );

    return outputBuffer.toString('utf16le');
  }

  // TODO: Implement
  WinGetClassListByHandle(hWnd: HWND, szRetText: LPWSTR, nBufSize: number): void {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  WinGetClientSize(szTitle: LPCWSTR, /*[in,defaultvalue("")]*/ szText: LPCWSTR, lpRect: LPRECT): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  WinGetClientSizeByHandle(hWnd: HWND, lpRect: LPRECT): number {
    throw new Error('Unimplemented');
  }

  WinGetHandle(szTitle: LPCWSTR, szText: LPCWSTR = ''): HWND {
    return this.call(
      'AU3_WinGetHandle',
      DataType.UInt64,
      [DataType.String16, DataType.String16],
      [szTitle, szText],
    );
  }

  // TODO: Implement
  WinGetHandleAsText(
    szTitle: LPCWSTR,
    /*[in,defaultvalue("")]*/ szText: LPCWSTR,
    szRetText: LPWSTR,
    nBufSize: number,
  ): void {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  WinGetPos(szTitle: LPCWSTR, /*[in,defaultvalue("")]*/ szText: LPCWSTR, lpRect: LPRECT): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  WinGetPosByHandle(hWnd: HWND, lpRect: LPRECT): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  WinGetProcess(szTitle: LPCWSTR, /*[in,defaultvalue("")]*/ szText: LPCWSTR): DWORD {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  WinGetProcessByHandle(hWnd: HWND): DWORD {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  WinGetState(szTitle: LPCWSTR, /*[in,defaultvalue("")]*/ szText: LPCWSTR): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  WinGetStateByHandle(hWnd: HWND): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  WinGetText(
    szTitle: LPCWSTR,
    /*[in,defaultvalue("")]*/ szText: LPCWSTR,
    szRetText: LPWSTR,
    nBufSize: number,
  ): void {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  WinGetTextByHandle(hWnd: HWND, szRetText: LPWSTR, nBufSize: number): void {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  WinGetTitle(
    szTitle: LPCWSTR,
    /*[in,defaultvalue("")]*/ szText: LPCWSTR,
    szRetText: LPWSTR,
    nBufSize: number,
  ): void {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  WinGetTitleByHandle(hWnd: HWND, szRetText: LPWSTR, nBufSize: number): void {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  WinKill(szTitle: LPCWSTR, /*[in,defaultvalue("")]*/ szText: LPCWSTR): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  WinKillByHandle(hWnd: HWND): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  WinMenuSelectItem(
    szTitle: LPCWSTR,
    /*[in,defaultvalue("")]*/ szText: LPCWSTR,
    szItem1: LPCWSTR,
    szItem2: LPCWSTR,
    szItem3: LPCWSTR,
    szItem4: LPCWSTR,
    szItem5: LPCWSTR,
    szItem6: LPCWSTR,
    szItem7: LPCWSTR,
    szItem8: LPCWSTR,
  ): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  WinMenuSelectItemByHandle(
    hWnd: HWND,
    szItem1: LPCWSTR,
    szItem2: LPCWSTR,
    szItem3: LPCWSTR,
    szItem4: LPCWSTR,
    szItem5: LPCWSTR,
    szItem6: LPCWSTR,
    szItem7: LPCWSTR,
    szItem8: LPCWSTR,
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
    szTitle: LPCWSTR,
    /*[in,defaultvalue("")]*/ szText: LPCWSTR,
    nX: number,
    nY: number,
    nWidth: number = -1,
    nHeight: number = -1,
  ): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  WinMoveByHandle(hWnd: HWND, nX: number, nY: number, nWidth: number = -1, nHeight: number = -1): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  WinSetOnTop(szTitle: LPCWSTR, /*[in,defaultvalue("")]*/ szText: LPCWSTR, nFlag: number): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  WinSetOnTopByHandle(hWnd: HWND, nFlag: number): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  WinSetState(szTitle: LPCWSTR, /*[in,defaultvalue("")]*/ szText: LPCWSTR, nFlags: number): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  WinSetStateByHandle(hWnd: HWND, nFlags: number): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  WinSetTitle(szTitle: LPCWSTR, /*[in,defaultvalue("")]*/ szText: LPCWSTR, szNewTitle: LPCWSTR): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  WinSetTitleByHandle(hWnd: HWND, szNewTitle: LPCWSTR): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  WinSetTrans(szTitle: LPCWSTR, /*[in,defaultvalue("")]*/ szText: LPCWSTR, nTrans: number): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  WinSetTransByHandle(hWnd: HWND, nTrans: number): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  WinWait(szTitle: LPCWSTR, /*[in,defaultvalue("")]*/ szText: LPCWSTR, nTimeout: number = 0): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  WinWaitByHandle(hWnd: HWND, nTimeout: number): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  WinWaitActive(szTitle: LPCWSTR, /*[in,defaultvalue("")]*/ szText: LPCWSTR, nTimeout: number = 0): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  WinWaitActiveByHandle(hWnd: HWND, nTimeout: number): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  WinWaitClose(szTitle: LPCWSTR, /*[in,defaultvalue("")]*/ szText: LPCWSTR, nTimeout: number = 0): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  WinWaitCloseByHandle(hWnd: HWND, nTimeout: number): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  WinWaitNotActive(szTitle: LPCWSTR, /*[in,defaultvalue("")]*/ szText: LPCWSTR, nTimeout: number): number {
    throw new Error('Unimplemented');
  }

  // TODO: Implement
  WinWaitNotActiveByHandle(hWnd: HWND, nTimeout: number = 0): number {
    throw new Error('Unimplemented');
  }
}
