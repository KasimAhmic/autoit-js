import { randomUUID } from 'node:crypto';
import { statSync } from 'node:fs';
import { join } from 'node:path';

import { ClipGet, ClipGetSync } from './clip-get';
import { ClipPut, ClipPutSync } from './clip-put';
import { ControlClick, ControlClickSync } from './control-click';
import { ControlClickByHandle, ControlClickByHandleSync } from './control-click-by-handle';
import { ControlDisable, ControlDisableSync } from './control-disable';
import { ControlDisableByHandle, ControlDisableByHandleSync } from './control-disable-by-handle';
import { ControlEnable, ControlEnableSync } from './control-enable';
import { ControlEnableByHandle, ControlEnableByHandleSync } from './control-enable-by-handle';
import { ControlFocus, ControlFocusSync } from './control-focus';
import { ControlFocusByHandle, ControlFocusByHandleSync } from './control-focus-by-handle';
import { ControlGetFocus, ControlGetFocusSync } from './control-get-focus';
import { ControlGetFocusByHandle, ControlGetFocusByHandleSync } from './control-get-focus-by-handle';
import { ControlGetHandle, ControlGetHandleSync } from './control-get-handle';
import { ControlGetHandleAsText, ControlGetHandleAsTextSync } from './control-get-handle-as-text';
import { ControlGetPos, ControlGetPosSync } from './control-get-pos';
import { ControlGetPosByHandle, ControlGetPosByHandleSync } from './control-get-pos-by-handle';
import { ControlGetText, ControlGetTextSync } from './control-get-text';
import { ControlGetTextByHandle, ControlGetTextByHandleSync } from './control-get-text-by-handle';
import { ControlHide, ControlHideSync } from './control-hide';
import { ControlHideByHandle, ControlHideByHandleSync } from './control-hide-by-handle';
import { ControlListView, ControlListViewSync, ListViewCommand } from './control-list-view';
import { ControlMove, ControlMoveSync } from './control-move';
import { ControlMoveByHandle, ControlMoveByHandleSync } from './control-move-by-handle';
import { ControlSetText, ControlSetTextSync } from './control-set-text';
import { ControlSetTextByHandle, ControlSetTextByHandleSync } from './control-set-text-by-handle';
import { ControlShow, ControlShowSync } from './control-show';
import { ControlShowByHandle, ControlShowByHandleSync } from './control-show-by-handle';
import { autoit } from './lib/autoit';
import { PixelGetColor, PixelGetColorSync } from './pixel-get-color';
import { ProcessClose, ProcessCloseSync } from './process-close';
import { Run, RunSync } from './run';
import { StatusbarGetText, StatusbarGetTextSync } from './statusbar-get-text';
import { StatusbarGetTextByHandle, StatusbarGetTextByHandleSync } from './statusbar-get-text-by-handle';
import { WinActivate, WinActivateSync } from './win-activate';
import { WinGetHandle, WinGetHandleSync } from './win-get-handle';
import { WinGetPos, WinGetPosSync } from './win-get-pos';
import { WinGetPosByHandle, WinGetPosByHandleSync } from './win-get-pos-by-handle';
import { WinGetState, WinGetStateSync } from './win-get-state';
import { WinGetStateByHandle, WinGetStateByHandleSync } from './win-get-state-by-handle';
import { WinGetTitle, WinGetTitleSync } from './win-get-title';
import { WinGetTitleByHandle, WinGetTitleByHandleSync } from './win-get-title-by-handle';
import { WinMenuSelectItem, WinMenuSelectItemSync } from './win-menu-select-item';
import { WinMenuSelectItemByHandle, WinMenuSelectItemByHandleSync } from './win-menu-select-item-by-handle';
import { WinMove, WinMoveSync } from './win-move';
import { WinMoveByHandle, WinMoveByHandleSync } from './win-move-by-handle';
import { WinSetOnTop, WinSetOnTopSync } from './win-set-on-top';
import { StateFlag, WinSetState, WinSetStateSync } from './win-set-state';
import { WinSetStateByHandle, WinSetStateByHandleSync } from './win-set-state-by-handle';
import { WinSetTitle, WinSetTitleSync } from './win-set-title';
import { WinSetTitleByHandle, WinSetTitleByHandleSync } from './win-set-title-by-handle';
import { WinSetTrans, WinSetTransSync } from './win-set-trans';
import { WinSetTransByHandle, WinSetTransByHandleSync } from './win-set-trans-by-handle';
import { WinWait, WinWaitSync } from './win-wait';
import { WinWaitClose, WinWaitCloseSync } from './win-wait-close';

describe.sequential('AutoIt JS @full', () => {
  let windowHandle: bigint;

  const APP_TITLE = 'TestApp';
  const FIRST_NAME_EDIT = 'Edit1';
  const LAST_NAME_EDIT = 'Edit2';
  const ABOUT_EDIT = 'Edit3';
  const TREE_VIEW = 'SysTreeView321';
  const OK_BUTTON = 'Button1';
  const CANCEL_BUTTON = 'Button2';
  const LIST_VIEW = 'SysListView321';
  const STATIC_LABEL = 'Static1';
  const OK_TITLE = 'OK';
  const CANCEL_TITLE = 'Cancel';
  const POPUP_BUTTON = 'Button1';

  beforeAll(() => {
    autoit.load();
    ProcessCloseSync('TestApp.exe');

    const testAppPath = join(__dirname, '..', 'bin', 'TestApp.exe');
    expect(statSync(testAppPath).isFile()).toBe(true);

    expect(RunSync(testAppPath)).toBeGreaterThan(0);
    expect(WinWaitSync(APP_TITLE, '', 10)).toBeGreaterThan(0);
    expect(WinSetOnTopSync(APP_TITLE, '', true)).toBe(1);

    windowHandle = WinGetHandleSync(APP_TITLE, '');
  });

  afterAll(() => {
    ProcessCloseSync('TestApp.exe');
    autoit.unload();
  });

  it('logs a warning if the library is loaded twice', () => {
    // @ts-expect-error Testing private member
    const loggerWarnSpy = vi.spyOn(autoit.logger, 'warn');

    autoit.load();

    expect(loggerWarnSpy).toHaveBeenCalledTimes(1);
    expect(loggerWarnSpy).toHaveBeenCalledWith('AutoIt is already loaded');
  });

  it('hides and shows the first name edit', () => {
    const handle = ControlGetHandleSync(windowHandle, FIRST_NAME_EDIT);

    expect(ControlHideSync(APP_TITLE, '', FIRST_NAME_EDIT)).toBe(1);
    expect(WinGetStateByHandleSync(handle).visible).toBe(false);

    expect(ControlShowSync(APP_TITLE, '', FIRST_NAME_EDIT)).toBe(1);
    expect(WinGetStateByHandleSync(handle).visible).toBe(true);

    expect(ControlHideByHandleSync(windowHandle, handle)).toBe(1);
    expect(WinGetStateByHandleSync(handle).visible).toBe(false);

    expect(ControlShowByHandleSync(windowHandle, handle)).toBe(1);
    expect(WinGetStateByHandleSync(handle).visible).toBe(true);
  });

  it('disables and enables the last name edit', () => {
    const handle = ControlGetHandleSync(windowHandle, LAST_NAME_EDIT);

    expect(ControlDisableSync(APP_TITLE, '', LAST_NAME_EDIT)).toBe(1);
    expect(WinGetStateByHandleSync(handle).enabled).toBe(false);

    expect(ControlEnableSync(APP_TITLE, '', LAST_NAME_EDIT)).toBe(1);
    expect(WinGetStateByHandleSync(handle).enabled).toBe(true);

    expect(ControlDisableByHandleSync(windowHandle, handle)).toBe(1);
    expect(WinGetStateByHandleSync(handle).enabled).toBe(false);

    expect(ControlEnableByHandleSync(windowHandle, handle)).toBe(1);
    expect(WinGetStateByHandleSync(handle).enabled).toBe(true);
  });

  it('moves and resizes the about edit', () => {
    const handle = ControlGetHandleSync(windowHandle, ABOUT_EDIT);
    const originalPos = ControlGetPosSync(APP_TITLE, '', ABOUT_EDIT);

    expect(ControlMoveSync(APP_TITLE, '', ABOUT_EDIT, 100, 100, 20, 20)).toBe(1);

    expect(ControlGetPosSync(APP_TITLE, '', ABOUT_EDIT)).toEqual({
      left: 100,
      top: 100,
      right: 120,
      bottom: 120,
    });

    expect(
      ControlMoveByHandleSync(
        windowHandle,
        handle,
        originalPos.left,
        originalPos.top,
        originalPos.right - originalPos.left,
        originalPos.bottom - originalPos.top,
      ),
    ).toBe(1);

    expect(ControlGetPosByHandleSync(windowHandle, ControlGetHandleSync(windowHandle, ABOUT_EDIT))).toEqual(
      originalPos,
    );
  });

  it('reads from and writes to the clipboard', () => {
    const uuid = randomUUID();

    ClipPutSync(uuid);

    expect(ClipGetSync()).toBe(uuid);
    expect(ClipGetSync(2)).toBe(uuid.slice(0, 2));
  });

  it('focuses a control', () => {
    const controlHandle = ControlGetHandleSync(windowHandle, LAST_NAME_EDIT);

    expect(ControlFocusSync(APP_TITLE, '', FIRST_NAME_EDIT)).toBe(1);
    expect(ControlGetFocusSync(APP_TITLE)).toBe(FIRST_NAME_EDIT);
    expect(ControlFocusByHandleSync(windowHandle, controlHandle)).toBe(1);
    expect(ControlGetFocusByHandleSync(windowHandle)).toBe(LAST_NAME_EDIT);
  });

  it('clicks a button', () => {
    expect(ControlClickSync(APP_TITLE, '', OK_BUTTON)).toBe(1);
    expect(WinWaitSync(OK_TITLE, '', 1)).toBeGreaterThan(0);

    expect(ControlClickSync(OK_TITLE, '', POPUP_BUTTON)).toBe(1);
    expect(WinWaitCloseSync(OK_TITLE, '', 1)).toBe(1);

    expect(ControlClickByHandleSync(windowHandle, ControlGetHandleSync(windowHandle, CANCEL_BUTTON))).toBe(1);
    expect(WinWaitSync(CANCEL_TITLE, '', 1)).toBeGreaterThan(0);

    const cancelPopup = WinGetHandleSync(CANCEL_TITLE);

    expect(ControlClickByHandleSync(cancelPopup, ControlGetHandleSync(cancelPopup, POPUP_BUTTON))).toBe(1);
    expect(WinWaitCloseSync(CANCEL_TITLE, '', 1)).toBe(1);
  });

  it('changes the window state', () => {
    WinSetStateSync(APP_TITLE, '', StateFlag.Minimize);
    expect(WinGetStateSync(APP_TITLE, '').minimized).toBe(true);

    WinSetStateByHandleSync(windowHandle, StateFlag.Restore);
    expect(WinGetStateByHandleSync(windowHandle).minimized).toBe(false);

    WinSetStateByHandleSync(windowHandle, StateFlag.Hide);
    expect(WinGetStateByHandleSync(windowHandle).visible).toBe(false);

    WinSetStateByHandleSync(windowHandle, StateFlag.Show);
    expect(WinGetStateByHandleSync(windowHandle).visible).toBe(true);

    WinSetStateByHandleSync(windowHandle, StateFlag.Maximize);
    expect(WinGetStateByHandleSync(windowHandle).maximized).toBe(true);

    WinSetStateByHandleSync(windowHandle, StateFlag.Restore);
    expect(WinGetStateByHandleSync(windowHandle).maximized).toBe(false);
  });

  it('gets the handle as text', () => {
    const handle = ControlGetHandleSync(windowHandle, TREE_VIEW);
    const handleText = ControlGetHandleAsTextSync(APP_TITLE, '', TREE_VIEW);

    expect(handleText).toBe('0x' + handle.toString(16).padStart(16, '0').toUpperCase());
    expect(parseInt(handleText, 16)).toBe(Number(handle));
  });

  it('sets the text of a control', () => {
    expect(ControlSetTextSync(APP_TITLE, '', STATIC_LABEL, 'Test Label')).toBe(1);
    expect(ControlGetTextSync(APP_TITLE, '', STATIC_LABEL)).toBe('Test Label');

    const control = ControlGetHandleSync(windowHandle, STATIC_LABEL);

    expect(ControlSetTextByHandleSync(windowHandle, control, 'Static Label 1')).toBe(1);
    expect(ControlGetTextByHandleSync(windowHandle, control)).toBe('Static Label 1');
  });

  it('interacts with a list view', () => {
    expect(ControlListViewSync(APP_TITLE, '', LIST_VIEW, ListViewCommand.GetItemCount)).toBe('50');
    expect(ControlListViewSync(APP_TITLE, '', LIST_VIEW, ListViewCommand.GetSubItemCount, '1')).toBe('4');

    expect(ControlListViewSync(APP_TITLE, '', LIST_VIEW, ListViewCommand.SelectAll)).toBe('1');
    expect(ControlListViewSync(APP_TITLE, '', LIST_VIEW, ListViewCommand.GetSelectedCount)).toBe('50');

    expect(ControlListViewSync(APP_TITLE, '', LIST_VIEW, ListViewCommand.SelectClear)).toBe('1');
    expect(ControlListViewSync(APP_TITLE, '', LIST_VIEW, ListViewCommand.GetSelectedCount)).toBe('0');

    expect(ControlListViewSync(APP_TITLE, '', LIST_VIEW, ListViewCommand.Select, '1')).toBe('1');
    expect(ControlListViewSync(APP_TITLE, '', LIST_VIEW, ListViewCommand.IsSelected, '1')).toBe('1');
    expect(ControlListViewSync(APP_TITLE, '', LIST_VIEW, ListViewCommand.IsSelected, '2')).toBe('0');
    expect(ControlListViewSync(APP_TITLE, '', LIST_VIEW, ListViewCommand.SelectInvert)).toBe('1');
    expect(ControlListViewSync(APP_TITLE, '', LIST_VIEW, ListViewCommand.GetSelectedCount)).toBe('49');

    expect(ControlListViewSync(APP_TITLE, '', LIST_VIEW, ListViewCommand.DeSelect, '0', '50')).toBe('1');
    expect(ControlListViewSync(APP_TITLE, '', LIST_VIEW, ListViewCommand.GetSelectedCount)).toBe('0');

    expect(ControlListViewSync(APP_TITLE, '', LIST_VIEW, ListViewCommand.Select, '1', '20')).toBe('1');
    expect(ControlListViewSync(APP_TITLE, '', LIST_VIEW, ListViewCommand.GetSelected)).toBe('1');
    expect(ControlListViewSync(APP_TITLE, '', LIST_VIEW, ListViewCommand.GetSelected, '1')).toBe(
      new Array(20)
        .fill(0)
        .map((_, i) => i + 1)
        .join('|'),
    );

    expect(ControlListViewSync(APP_TITLE, '', LIST_VIEW, ListViewCommand.FindItem, 'unknown')).toBe('-1');
    expect(ControlListViewSync(APP_TITLE, '', LIST_VIEW, ListViewCommand.FindItem, 'R10 C1')).toBe('9');

    // TODO: Figure out how to validate this
    // expect(ControlListView(APP_TITLE, '', LIST_VIEW, ListViewCommand.ViewChange, 'details')).toBe('1');
  });

  it('sets the title', () => {
    const title = WinGetTitleSync(APP_TITLE);

    expect(title).toBe(APP_TITLE);
    expect(WinSetTitleSync(APP_TITLE, '', 'Testing')).toBe(1);

    expect(WinSetTitleByHandleSync(windowHandle, 'TestApp')).toBe(1);
    expect(WinGetTitleByHandleSync(windowHandle)).toBe('TestApp');

    expect(WinSetTitleByHandleSync(windowHandle, APP_TITLE)).toBe(1);
  });

  it('moves the window', () => {
    expect(WinMoveSync(APP_TITLE, '', 100, 100)).toBe(1);

    const pos = WinGetPosSync(APP_TITLE);

    expect(pos.left).toBe(100);
    expect(pos.top).toBe(100);

    expect(WinMoveByHandleSync(windowHandle, 200, 200)).toBe(1);

    const newPos = WinGetPosByHandleSync(windowHandle);

    expect(newPos.left).toBe(200);
    expect(newPos.top).toBe(200);
  });

  it('selects a menu option', () => {
    expect(WinMenuSelectItemSync(APP_TITLE, '', '&Help', '&About')).toBe(1);
    expect(WinWaitSync('About TestApp', '', 1)).toBeGreaterThan(0);
    expect(ControlClickSync('About TestApp', '', 'Button1')).toBe(1);

    expect(WinMenuSelectItemByHandleSync(windowHandle, '&Help', '&About')).toBe(1);
    expect(WinWaitSync('About TestApp', '', 1)).toBeGreaterThan(0);
    expect(ControlClickSync('About TestApp', '', 'Button1')).toBe(1);
  });

  it('gets the status bar text', () => {
    expect(StatusbarGetTextSync(APP_TITLE, '', 2)).toBe(' Status 1');
    expect(StatusbarGetTextByHandleSync(windowHandle, 3)).toBe(' Status 2');
  });

  it('gets the color of a pixel', () => {
    expect(WinActivateSync(APP_TITLE)).toBe(1);
    const rect = WinGetPosSync(APP_TITLE);

    expect(PixelGetColorSync(rect.right - 25, rect.bottom - 45)).toBe(0xfeb800);
  });

  it('sets the transparency of the window', () => {
    expect(WinSetTransSync(APP_TITLE, '', 127)).toBe(1);
    expect(WinSetTransByHandleSync(windowHandle, 255)).toBe(1);
  });
});
