import { randomUUID } from 'node:crypto';
import { join } from 'node:path';

import { autoit } from './autoit/autoit';
import { ClipGet } from './clip-get';
import { ClipPut } from './clip-put';
import { ControlClick } from './control-click';
import { ControlClickByHandle } from './control-click-by-handle';
import { ControlDisable } from './control-disable';
import { ControlDisableByHandle } from './control-disable-by-handle';
import { ControlEnable } from './control-enable';
import { ControlEnableByHandle } from './control-enable-by-handle';
import { ControlFocus } from './control-focus';
import { ControlFocusByHandle } from './control-focus-by-handle';
import { ControlGetFocus } from './control-get-focus';
import { ControlGetFocusByHandle } from './control-get-focus-by-handle';
import { ControlGetHandle } from './control-get-handle';
import { ControlGetHandleAsText } from './control-get-handle-as-text';
import { ControlGetPos } from './control-get-pos';
import { ControlGetPosByHandle } from './control-get-pos-by-handle';
import { ControlGetText } from './control-get-text';
import { ControlGetTextByHandle } from './control-get-text-by-handle';
import { ControlHide } from './control-hide';
import { ControlHideByHandle } from './control-hide-by-handle';
import { ControlListView, ListViewCommand } from './control-list-view';
import { ControlMove } from './control-move';
import { ControlMoveByHandle } from './control-move-by-handle';
import { ControlSetText } from './control-set-text';
import { ControlSetTextByHandle } from './control-set-text-by-handle';
import { ControlShow } from './control-show';
import { ControlShowByHandle } from './control-show-by-handle';
import { PixelGetColor } from './pixel-get-color';
import { ProcessClose } from './process-close';
import { Run } from './run';
import { StatusbarGetText } from './statusbar-get-text';
import { StatusbarGetTextByHandle } from './statusbar-get-text-by-handle';
import { WinActivate } from './win-activate';
import { WinGetHandle } from './win-get-handle';
import { WinGetPos } from './win-get-pos';
import { WinGetPosByHandle } from './win-get-pos-by-handle';
import { WinGetState } from './win-get-state';
import { WinGetStateByHandle } from './win-get-state-by-handle';
import { WinGetTitle } from './win-get-title';
import { WinGetTitleByHandle } from './win-get-title-by-handle';
import { WinMenuSelectItem } from './win-menu-select-item';
import { WinMenuSelectItemByHandle } from './win-menu-select-item-by-handle';
import { WinMove } from './win-move';
import { WinMoveByHandle } from './win-move-by-handle';
import { WinSetTitleByHandle } from './win-set-new-title-by-handle';
import { OnTop, WinSetOnTop } from './win-set-on-top';
import { StateFlag, WinSetState } from './win-set-state';
import { WinSetStateByHandle } from './win-set-state-by-handle';
import { WinSetTitle } from './win-set-title';
import { WinSetTrans } from './win-set-trans';
import { WinSetTransByHandle } from './win-set-trans-by-handle';
import { WinWait } from './win-wait';
import { WinWaitClose } from './win-wait-close';

describe.sequential('AutoIt JS', () => {
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
    ProcessClose('TestApp.exe');

    expect(Run(join(__dirname, '..', 'TestApp', 'x64', 'Release', 'TestApp.exe'))).toBeGreaterThan(0);
    expect(WinWait(APP_TITLE, '', 10)).toBeGreaterThan(0);
    expect(WinSetOnTop(APP_TITLE, '', OnTop.Yes)).toBe(1);

    windowHandle = WinGetHandle(APP_TITLE, '');
  });

  afterAll(() => {
    ProcessClose('TestApp.exe');
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
    const handle = ControlGetHandle(windowHandle, FIRST_NAME_EDIT);

    expect(ControlHide(APP_TITLE, '', FIRST_NAME_EDIT)).toBe(1);
    expect(WinGetStateByHandle(handle).visible).toBe(false);

    expect(ControlShow(APP_TITLE, '', FIRST_NAME_EDIT)).toBe(1);
    expect(WinGetStateByHandle(handle).visible).toBe(true);

    expect(ControlHideByHandle(windowHandle, handle)).toBe(1);
    expect(WinGetStateByHandle(handle).visible).toBe(false);

    expect(ControlShowByHandle(windowHandle, handle)).toBe(1);
    expect(WinGetStateByHandle(handle).visible).toBe(true);
  });

  it('disables and enables the last name edit', () => {
    const handle = ControlGetHandle(windowHandle, LAST_NAME_EDIT);

    expect(ControlDisable(APP_TITLE, '', LAST_NAME_EDIT)).toBe(1);
    expect(WinGetStateByHandle(handle).enabled).toBe(false);

    expect(ControlEnable(APP_TITLE, '', LAST_NAME_EDIT)).toBe(1);
    expect(WinGetStateByHandle(handle).enabled).toBe(true);

    expect(ControlDisableByHandle(windowHandle, handle)).toBe(1);
    expect(WinGetStateByHandle(handle).enabled).toBe(false);

    expect(ControlEnableByHandle(windowHandle, handle)).toBe(1);
    expect(WinGetStateByHandle(handle).enabled).toBe(true);
  });

  it('moves and resizes the about edit', () => {
    const handle = ControlGetHandle(windowHandle, ABOUT_EDIT);
    const originalPos = ControlGetPos(APP_TITLE, '', ABOUT_EDIT);

    expect(ControlMove(APP_TITLE, '', ABOUT_EDIT, 100, 100, 20, 20)).toBe(1);

    expect(ControlGetPos(APP_TITLE, '', ABOUT_EDIT)).toEqual({
      left: 100,
      top: 100,
      right: 120,
      bottom: 120,
    });

    expect(
      ControlMoveByHandle(
        windowHandle,
        handle,
        originalPos.left,
        originalPos.top,
        originalPos.right - originalPos.left,
        originalPos.bottom - originalPos.top,
      ),
    ).toBe(1);

    expect(ControlGetPosByHandle(windowHandle, ControlGetHandle(windowHandle, ABOUT_EDIT))).toEqual(
      originalPos,
    );
  });

  it('reads from and writes to the clipboard', () => {
    const uuid = randomUUID();

    ClipPut(uuid);

    expect(ClipGet()).toBe(uuid);
    expect(ClipGet(2)).toBe(uuid.slice(0, 2));
  });

  it('focuses a control', () => {
    const controlHandle = ControlGetHandle(windowHandle, LAST_NAME_EDIT);

    expect(ControlFocus(APP_TITLE, '', FIRST_NAME_EDIT)).toBe(1);
    expect(ControlGetFocus(APP_TITLE)).toBe(FIRST_NAME_EDIT);
    expect(ControlFocusByHandle(windowHandle, controlHandle)).toBe(1);
    expect(ControlGetFocusByHandle(windowHandle)).toBe(LAST_NAME_EDIT);
  });

  it('clicks a button', () => {
    expect(ControlClick(APP_TITLE, '', OK_BUTTON)).toBe(1);
    expect(WinWait(OK_TITLE, '', 1)).toBeGreaterThan(0);

    expect(ControlClick(OK_TITLE, '', POPUP_BUTTON)).toBe(1);
    expect(WinWaitClose(OK_TITLE, '', 1)).toBe(1);

    expect(ControlClickByHandle(windowHandle, ControlGetHandle(windowHandle, CANCEL_BUTTON))).toBe(1);
    expect(WinWait(CANCEL_TITLE, '', 1)).toBeGreaterThan(0);

    const cancelPopup = WinGetHandle(CANCEL_TITLE);

    expect(ControlClickByHandle(cancelPopup, ControlGetHandle(cancelPopup, POPUP_BUTTON))).toBe(1);
    expect(WinWaitClose(CANCEL_TITLE, '', 1)).toBe(1);
  });

  it('changes the window state', () => {
    WinSetState(APP_TITLE, '', StateFlag.Minimize);
    expect(WinGetState(APP_TITLE, '').minimized).toBe(true);

    WinSetStateByHandle(windowHandle, StateFlag.Restore);
    expect(WinGetStateByHandle(windowHandle).minimized).toBe(false);

    WinSetStateByHandle(windowHandle, StateFlag.Hide);
    expect(WinGetStateByHandle(windowHandle).visible).toBe(false);

    WinSetStateByHandle(windowHandle, StateFlag.Show);
    expect(WinGetStateByHandle(windowHandle).visible).toBe(true);

    WinSetStateByHandle(windowHandle, StateFlag.Maximize);
    expect(WinGetStateByHandle(windowHandle).maximized).toBe(true);

    WinSetStateByHandle(windowHandle, StateFlag.Restore);
    expect(WinGetStateByHandle(windowHandle).maximized).toBe(false);
  });

  it('gets the handle as text', () => {
    const handle = ControlGetHandle(windowHandle, TREE_VIEW);
    const handleText = ControlGetHandleAsText(APP_TITLE, '', TREE_VIEW);

    expect(handleText).toBe('0x' + handle.toString(16).padStart(16, '0').toUpperCase());
    expect(parseInt(handleText, 16)).toBe(Number(handle));
  });

  it('sets the text of a control', () => {
    expect(ControlSetText(APP_TITLE, '', STATIC_LABEL, 'Test Label')).toBe(1);
    expect(ControlGetText(APP_TITLE, '', STATIC_LABEL)).toBe('Test Label');

    const control = ControlGetHandle(windowHandle, STATIC_LABEL);

    expect(ControlSetTextByHandle(windowHandle, control, 'Static Label 1')).toBe(1);
    expect(ControlGetTextByHandle(windowHandle, control)).toBe('Static Label 1');
  });

  it('interacts with a list view', () => {
    expect(ControlListView(APP_TITLE, '', LIST_VIEW, ListViewCommand.GetItemCount)).toBe('50');
    expect(ControlListView(APP_TITLE, '', LIST_VIEW, ListViewCommand.GetSubItemCount, '1')).toBe('4');

    expect(ControlListView(APP_TITLE, '', LIST_VIEW, ListViewCommand.SelectAll)).toBe('1');
    expect(ControlListView(APP_TITLE, '', LIST_VIEW, ListViewCommand.GetSelectedCount)).toBe('50');

    expect(ControlListView(APP_TITLE, '', LIST_VIEW, ListViewCommand.SelectClear)).toBe('1');
    expect(ControlListView(APP_TITLE, '', LIST_VIEW, ListViewCommand.GetSelectedCount)).toBe('0');

    expect(ControlListView(APP_TITLE, '', LIST_VIEW, ListViewCommand.Select, '1')).toBe('1');
    expect(ControlListView(APP_TITLE, '', LIST_VIEW, ListViewCommand.IsSelected, '1')).toBe('1');
    expect(ControlListView(APP_TITLE, '', LIST_VIEW, ListViewCommand.IsSelected, '2')).toBe('0');
    expect(ControlListView(APP_TITLE, '', LIST_VIEW, ListViewCommand.SelectInvert)).toBe('1');
    expect(ControlListView(APP_TITLE, '', LIST_VIEW, ListViewCommand.GetSelectedCount)).toBe('49');

    expect(ControlListView(APP_TITLE, '', LIST_VIEW, ListViewCommand.DeSelect, '0', '50')).toBe('1');
    expect(ControlListView(APP_TITLE, '', LIST_VIEW, ListViewCommand.GetSelectedCount)).toBe('0');

    expect(ControlListView(APP_TITLE, '', LIST_VIEW, ListViewCommand.Select, '1', '20')).toBe('1');
    expect(ControlListView(APP_TITLE, '', LIST_VIEW, ListViewCommand.GetSelected)).toBe('1');
    expect(ControlListView(APP_TITLE, '', LIST_VIEW, ListViewCommand.GetSelected, '1')).toBe(
      new Array(20)
        .fill(0)
        .map((_, i) => i + 1)
        .join('|'),
    );

    expect(ControlListView(APP_TITLE, '', LIST_VIEW, ListViewCommand.FindItem, 'unknown')).toBe('-1');
    expect(ControlListView(APP_TITLE, '', LIST_VIEW, ListViewCommand.FindItem, 'R10 C1')).toBe('9');

    // TODO: Figure out how to validate this
    // expect(ControlListView(APP_TITLE, '', LIST_VIEW, ListViewCommand.ViewChange, 'details')).toBe('1');
  });

  it('sets the title', () => {
    const title = WinGetTitle(APP_TITLE);

    expect(title).toBe(APP_TITLE);
    expect(WinSetTitle(APP_TITLE, '', 'Testing')).toBe(1);

    expect(WinSetTitleByHandle(windowHandle, 'TestApp')).toBe(1);
    expect(WinGetTitleByHandle(windowHandle)).toBe('TestApp');

    expect(WinSetTitleByHandle(windowHandle, APP_TITLE)).toBe(1);
  });

  it('moves the window', () => {
    expect(WinMove(APP_TITLE, '', 100, 100)).toBe(1);

    const pos = WinGetPos(APP_TITLE);

    expect(pos.left).toBe(100);
    expect(pos.top).toBe(100);

    expect(WinMoveByHandle(windowHandle, 200, 200)).toBe(1);

    const newPos = WinGetPosByHandle(windowHandle);

    expect(newPos.left).toBe(200);
    expect(newPos.top).toBe(200);
  });

  it('selects a menu option', () => {
    expect(WinMenuSelectItem(APP_TITLE, '', '&Help', '&About')).toBe(1);
    expect(WinWait('About TestApp', '', 1)).toBeGreaterThan(0);
    expect(ControlClick('About TestApp', '', 'Button1')).toBe(1);

    expect(WinMenuSelectItemByHandle(windowHandle, '&Help', '&About')).toBe(1);
    expect(WinWait('About TestApp', '', 1)).toBeGreaterThan(0);
    expect(ControlClick('About TestApp', '', 'Button1')).toBe(1);
  });

  it('gets the status bar text', () => {
    expect(StatusbarGetText(APP_TITLE, '', 2)).toBe(' Status 1');
    expect(StatusbarGetTextByHandle(windowHandle, 3)).toBe(' Status 2');
  });

  it('gets the color of a pixel', () => {
    expect(WinActivate(APP_TITLE)).toBe(1);
    const rect = WinGetPos(APP_TITLE);

    expect(PixelGetColor(rect.right - 25, rect.bottom - 45)).toBe(0xfeb800);
  });

  it('sets the transparency of the window', () => {
    expect(WinSetTrans(APP_TITLE, '', 127)).toBe(1);
    expect(WinSetTransByHandle(windowHandle, 255)).toBe(1);
  });
});
