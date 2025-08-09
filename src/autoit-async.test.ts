import { randomUUID } from 'node:crypto';
import { statSync } from 'node:fs';
import { join } from 'node:path';

import { EVENT_LABEL, PROCESS_NAME } from './@testing/test-constants';
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
import { ControlListViewByHandle } from './control-list-view-by-handles';
import { ControlMove } from './control-move';
import { ControlMoveByHandle } from './control-move-by-handle';
import { ControlSetText } from './control-set-text';
import { ControlSetTextByHandle } from './control-set-text-by-handle';
import { ControlShow } from './control-show';
import { ControlShowByHandle } from './control-show-by-handle';
import { ControlTreeView, TreeViewCommand } from './control-tree-view';
import { ControlTreeViewByHandle } from './control-tree-view-by-handle';
import { autoit } from './lib/autoit';
import * as gdi32 from './lib/gdi32';
import { MouseButton, MouseClick } from './mouse-click';
import { MouseClickDrag } from './mouse-click-drag';
import { MouseDown } from './mouse-down';
import { Cursor, MouseGetCursor } from './mouse-get-cursor';
import { MouseGetPos } from './mouse-get-pos';
import { MouseMove } from './mouse-move';
import { MouseUp } from './mouse-up';
import { MouseWheel, ScrollDirection } from './mouse-wheel';
import { PixelGetColor } from './pixel-get-color';
import { PixelSearch } from './pixel-search';
import { ProcessClose } from './process-close';
import { Priority, ProcessSetPriority } from './process-set-priority';
import { Run } from './run';
import { StatusbarGetText } from './statusbar-get-text';
import { StatusbarGetTextByHandle } from './statusbar-get-text-by-handle';
import { WinActivate } from './win-activate';
import { WinGetClassList } from './win-get-class-list';
import { WinGetClassListByHandle } from './win-get-class-list-by-handle';
import { WinGetClientSize } from './win-get-client-size';
import { WinGetClientSizeByHandle } from './win-get-client-size-by-handle';
import { WinGetHandle } from './win-get-handle';
import { WinGetHandleAsText } from './win-get-handle-as-text';
import { WinGetPos } from './win-get-pos';
import { WinGetPosByHandle } from './win-get-pos-by-handle';
import { WinGetProcess } from './win-get-process';
import { WinGetProcessByHandle } from './win-get-process-by-handle';
import { WinGetState } from './win-get-state';
import { WinGetStateByHandle } from './win-get-state-by-handle';
import { WinGetText } from './win-get-text';
import { WinGetTextByHandle } from './win-get-text-by-handle';
import { WinGetTitle } from './win-get-title';
import { WinGetTitleByHandle } from './win-get-title-by-handle';
import { WinMenuSelectItem } from './win-menu-select-item';
import { WinMenuSelectItemByHandle } from './win-menu-select-item-by-handle';
import { WinMinimizeAll } from './win-minimize-all';
import { WinMinimizeAllUndo } from './win-minimize-all-undo';
import { WinMove } from './win-move';
import { WinMoveByHandle } from './win-move-by-handle';
import { WinSetOnTop } from './win-set-on-top';
import { StateFlag, WinSetState } from './win-set-state';
import { WinSetStateByHandle } from './win-set-state-by-handle';
import { WinSetTitle } from './win-set-title';
import { WinSetTitleByHandle } from './win-set-title-by-handle';
import { WinSetTrans } from './win-set-trans';
import { WinSetTransByHandle } from './win-set-trans-by-handle';
import { WinWait } from './win-wait';
import { WinWaitClose } from './win-wait-close';

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

  beforeAll(async () => {
    autoit.load();
    await ProcessClose('TestApp.exe');

    const testAppPath = join(__dirname, '..', 'bin', 'TestApp.exe');
    expect(statSync(testAppPath).isFile()).toBe(true);

    expect(await Run(testAppPath)).toBeGreaterThan(0);
    expect(await WinWait(APP_TITLE, '', 10)).toBeGreaterThan(0);
    expect(await WinSetOnTop(APP_TITLE, '', true)).toBe(1);

    windowHandle = await WinGetHandle(APP_TITLE, '');
  });

  afterAll(async () => {
    await ProcessClose('TestApp.exe');
    autoit.unload();
  });

  it('logs a warning if the library is loaded twice', () => {
    // @ts-expect-error Testing private member
    const loggerWarnSpy = vi.spyOn(autoit.logger, 'warn');

    autoit.load();

    expect(loggerWarnSpy).toHaveBeenCalledTimes(1);
    expect(loggerWarnSpy).toHaveBeenCalledWith('AutoIt is already loaded');
  });

  it('hides and shows the first name edit', async () => {
    const handle = await ControlGetHandle(windowHandle, FIRST_NAME_EDIT);

    expect(await ControlHide(APP_TITLE, '', FIRST_NAME_EDIT)).toBe(1);
    expect((await WinGetStateByHandle(handle)).visible).toBe(false);

    expect(await ControlShow(APP_TITLE, '', FIRST_NAME_EDIT)).toBe(1);
    expect((await WinGetStateByHandle(handle)).visible).toBe(true);

    expect(await ControlHideByHandle(windowHandle, handle)).toBe(1);
    expect((await WinGetStateByHandle(handle)).visible).toBe(false);

    expect(await ControlShowByHandle(windowHandle, handle)).toBe(1);
    expect((await WinGetStateByHandle(handle)).visible).toBe(true);
  });

  it('disables and enables the last name edit', async () => {
    const handle = await ControlGetHandle(windowHandle, LAST_NAME_EDIT);

    expect(await ControlDisable(APP_TITLE, '', LAST_NAME_EDIT)).toBe(1);
    expect((await WinGetStateByHandle(handle)).enabled).toBe(false);

    expect(await ControlEnable(APP_TITLE, '', LAST_NAME_EDIT)).toBe(1);
    expect((await WinGetStateByHandle(handle)).enabled).toBe(true);

    expect(await ControlDisableByHandle(windowHandle, handle)).toBe(1);
    expect((await WinGetStateByHandle(handle)).enabled).toBe(false);

    expect(await ControlEnableByHandle(windowHandle, handle)).toBe(1);
    expect((await WinGetStateByHandle(handle)).enabled).toBe(true);
  });

  it('moves and resizes the about edit', async () => {
    const handle = await ControlGetHandle(windowHandle, ABOUT_EDIT);
    const originalPos = await ControlGetPos(APP_TITLE, '', ABOUT_EDIT);

    expect(await ControlMove(APP_TITLE, '', ABOUT_EDIT, 100, 100, 20, 20)).toBe(1);

    expect(await ControlGetPos(APP_TITLE, '', ABOUT_EDIT)).toEqual({
      left: 100,
      top: 100,
      right: 120,
      bottom: 120,
    });

    expect(
      await ControlMoveByHandle(
        windowHandle,
        handle,
        originalPos.left,
        originalPos.top,
        originalPos.right - originalPos.left,
        originalPos.bottom - originalPos.top,
      ),
    ).toBe(1);

    expect(
      await ControlGetPosByHandle(windowHandle, await ControlGetHandle(windowHandle, ABOUT_EDIT)),
    ).toEqual(originalPos);
  });

  it('reads from and writes to the clipboard', async () => {
    const uuid = randomUUID();

    await ClipPut(uuid);

    expect(await ClipGet()).toBe(uuid);
    expect(await ClipGet(2)).toBe(uuid.slice(0, 2));
  });

  it('focuses a control', async () => {
    const controlHandle = await ControlGetHandle(windowHandle, LAST_NAME_EDIT);

    expect(await ControlFocus(APP_TITLE, '', FIRST_NAME_EDIT)).toBe(1);
    expect(await ControlGetFocus(APP_TITLE)).toBe(FIRST_NAME_EDIT);
    expect(await ControlFocusByHandle(windowHandle, controlHandle)).toBe(1);
    expect(await ControlGetFocusByHandle(windowHandle)).toBe(LAST_NAME_EDIT);
  });

  it('clicks a button', async () => {
    expect(await ControlClick(APP_TITLE, '', OK_BUTTON)).toBe(1);
    expect(await WinWait(OK_TITLE, '', 1)).toBeGreaterThan(0);

    expect(await ControlClick(OK_TITLE, '', POPUP_BUTTON)).toBe(1);
    expect(await WinWaitClose(OK_TITLE, '', 1)).toBe(1);

    expect(
      await ControlClickByHandle(windowHandle, await ControlGetHandle(windowHandle, CANCEL_BUTTON)),
    ).toBe(1);
    expect(await WinWait(CANCEL_TITLE, '', 1)).toBeGreaterThan(0);

    const cancelPopup = await WinGetHandle(CANCEL_TITLE);

    expect(await ControlClickByHandle(cancelPopup, await ControlGetHandle(cancelPopup, POPUP_BUTTON))).toBe(
      1,
    );
    expect(await WinWaitClose(CANCEL_TITLE, '', 1)).toBe(1);
  });

  it('changes the window state', async () => {
    await WinSetState(APP_TITLE, '', StateFlag.Minimize);
    expect((await WinGetState(APP_TITLE, '')).minimized).toBe(true);

    await WinSetStateByHandle(windowHandle, StateFlag.Restore);
    expect((await WinGetStateByHandle(windowHandle)).minimized).toBe(false);

    await WinSetStateByHandle(windowHandle, StateFlag.Hide);
    expect((await WinGetStateByHandle(windowHandle)).visible).toBe(false);

    await WinSetStateByHandle(windowHandle, StateFlag.Show);
    expect((await WinGetStateByHandle(windowHandle)).visible).toBe(true);

    await WinSetStateByHandle(windowHandle, StateFlag.Maximize);
    expect((await WinGetStateByHandle(windowHandle)).maximized).toBe(true);

    await WinSetStateByHandle(windowHandle, StateFlag.Restore);
    expect((await WinGetStateByHandle(windowHandle)).maximized).toBe(false);
  });

  it('gets the handle as text', async () => {
    const handle = await ControlGetHandle(windowHandle, TREE_VIEW);
    const handleText = await ControlGetHandleAsText(APP_TITLE, '', TREE_VIEW);

    expect(handleText).toBe('0x' + handle.toString(16).padStart(16, '0').toUpperCase());
    expect(parseInt(handleText, 16)).toBe(Number(handle));
  });

  it('sets the text of a control', async () => {
    expect(await ControlSetText(APP_TITLE, '', STATIC_LABEL, 'Test Label')).toBe(1);
    expect(await ControlGetText(APP_TITLE, '', STATIC_LABEL)).toBe('Test Label');

    const control = await ControlGetHandle(windowHandle, STATIC_LABEL);

    expect(await ControlSetTextByHandle(windowHandle, control, 'Static Label 1')).toBe(1);
    expect(await ControlGetTextByHandle(windowHandle, control)).toBe('Static Label 1');
  });

  it('interacts with a list view', async () => {
    expect(await ControlListView(APP_TITLE, '', LIST_VIEW, ListViewCommand.GetItemCount)).toBe('50');
    expect(await ControlListView(APP_TITLE, '', LIST_VIEW, ListViewCommand.GetSubItemCount, '1')).toBe('4');

    expect(await ControlListView(APP_TITLE, '', LIST_VIEW, ListViewCommand.SelectAll)).toBe('1');
    expect(await ControlListView(APP_TITLE, '', LIST_VIEW, ListViewCommand.GetSelectedCount)).toBe('50');

    expect(await ControlListView(APP_TITLE, '', LIST_VIEW, ListViewCommand.SelectClear)).toBe('1');
    expect(await ControlListView(APP_TITLE, '', LIST_VIEW, ListViewCommand.GetSelectedCount)).toBe('0');

    const handle = await ControlGetHandle(windowHandle, LIST_VIEW);

    expect(await ControlListViewByHandle(windowHandle, handle, ListViewCommand.Select, '1')).toBe('1');
    expect(await ControlListViewByHandle(windowHandle, handle, ListViewCommand.IsSelected, '1')).toBe('1');
    expect(await ControlListViewByHandle(windowHandle, handle, ListViewCommand.IsSelected, '2')).toBe('0');
    expect(await ControlListViewByHandle(windowHandle, handle, ListViewCommand.SelectInvert)).toBe('1');
    expect(await ControlListViewByHandle(windowHandle, handle, ListViewCommand.GetSelectedCount)).toBe('49');

    expect(await ControlListViewByHandle(windowHandle, handle, ListViewCommand.DeSelect, '0', '50')).toBe(
      '1',
    );
    expect(await ControlListViewByHandle(windowHandle, handle, ListViewCommand.GetSelectedCount)).toBe('0');

    expect(await ControlListViewByHandle(windowHandle, handle, ListViewCommand.Select, '1', '20')).toBe('1');
    expect(await ControlListViewByHandle(windowHandle, handle, ListViewCommand.GetSelected)).toBe('1');
    expect(await ControlListViewByHandle(windowHandle, handle, ListViewCommand.GetSelected, '1')).toBe(
      new Array(20)
        .fill(0)
        .map((_, i) => i + 1)
        .join('|'),
    );

    expect(await ControlListView(APP_TITLE, '', LIST_VIEW, ListViewCommand.FindItem, 'unknown')).toBe('-1');
    expect(await ControlListView(APP_TITLE, '', LIST_VIEW, ListViewCommand.FindItem, 'R10 C1')).toBe('9');

    // TODO: Figure out how to validate this
    // expect(ControlListView(APP_TITLE, '', LIST_VIEW, ListViewCommand.ViewChange, 'details')).toBe('1');
  });

  it('sets the title', async () => {
    const title = await WinGetTitle(APP_TITLE);

    expect(title).toBe(APP_TITLE);
    expect(await WinSetTitle(APP_TITLE, '', 'Testing')).toBe(1);

    expect(await WinSetTitleByHandle(windowHandle, 'TestApp')).toBe(1);
    expect(await WinGetTitleByHandle(windowHandle)).toBe('TestApp');

    expect(await WinSetTitleByHandle(windowHandle, APP_TITLE)).toBe(1);
  });

  it('moves the window', async () => {
    expect(await WinMove(APP_TITLE, '', 100, 100)).toBe(1);

    const pos = await WinGetPos(APP_TITLE);

    expect(pos.left).toBe(100);
    expect(pos.top).toBe(100);

    expect(await WinMoveByHandle(windowHandle, 200, 200)).toBe(1);

    const newPos = await WinGetPosByHandle(windowHandle);

    expect(newPos.left).toBe(200);
    expect(newPos.top).toBe(200);
  });

  it('selects a menu option', async () => {
    expect(await WinMenuSelectItem(APP_TITLE, '', '&Help', '&About')).toBe(1);
    expect(await WinWait('About TestApp', '', 1)).toBeGreaterThan(0);
    expect(await ControlClick('About TestApp', '', 'Button1')).toBe(1);

    expect(await WinMenuSelectItemByHandle(windowHandle, '&Help', '&About')).toBe(1);
    expect(await WinWait('About TestApp', '', 1)).toBeGreaterThan(0);
    expect(await ControlClick('About TestApp', '', 'Button1')).toBe(1);
  });

  it('gets the status bar text', async () => {
    expect(await StatusbarGetText(APP_TITLE, '', 2)).toBe(' Status 1');
    expect(await StatusbarGetTextByHandle(windowHandle, 3)).toBe(' Status 2');
  });

  it('gets the color of a pixel', async () => {
    expect(await WinActivate(APP_TITLE)).toBe(1);
    const rect = await WinGetPos(APP_TITLE);

    expect(await PixelGetColor(rect.right - 25, rect.bottom - 45)).toBe(0xfeb800);
  });

  it('sets the transparency of the window', async () => {
    expect(await WinSetTrans(APP_TITLE, '', 127)).toBe(1);
    expect(await WinSetTransByHandle(windowHandle, 255)).toBe(1);
  });

  it('gets the text of the window', async () => {
    const windowText = await WinGetText(APP_TITLE);

    expect(windowText.length).toBeGreaterThan(100);
    expect(await WinGetTextByHandle(windowHandle)).toBe(windowText);
    expect(await WinGetText(APP_TITLE, '', 100)).toBe(windowText.slice(0, 100));
    expect(await WinGetTextByHandle(windowHandle, 100)).toBe(windowText.slice(0, 100));
  });

  it('sets the process priority', async () => {
    expect(await ProcessSetPriority(PROCESS_NAME, Priority.High)).toBe(1);
    expect(await ProcessSetPriority(PROCESS_NAME, Priority.Normal)).toBe(1);
  });

  it('gets the process ID of the window', async () => {
    const processId = await WinGetProcess(APP_TITLE);
    expect(processId).toBeGreaterThan(0);
    expect(await WinGetProcessByHandle(windowHandle)).toBe(processId);
  });

  it('gets the window handle', async () => {
    const handle = await WinGetHandle(APP_TITLE);
    const textHandle = await WinGetHandleAsText(APP_TITLE);

    expect(handle).toBe(windowHandle);
    expect(parseInt(textHandle, 16)).toBe(Number(windowHandle));
  });

  it('gets the client size', async () => {
    const rect = await WinGetClientSize(APP_TITLE);

    expect(rect).toEqual(await WinGetClientSizeByHandle(windowHandle));
  });

  it('minimizes and restores all windows', async () => {
    expect(await WinMinimizeAll()).toBe(undefined);
    expect(await WinMinimizeAllUndo()).toBe(undefined);
  });

  it('gets the class list of the window', async () => {
    const classList = await WinGetClassList(APP_TITLE);
    expect(await WinGetClassListByHandle(windowHandle)).toBe(classList);
  });

  it('interacts with a tree view', async () => {
    expect(await ControlTreeView(APP_TITLE, '', TREE_VIEW, TreeViewCommand.GetItemCount)).toBe('1');
    expect(await ControlTreeView(APP_TITLE, '', TREE_VIEW, TreeViewCommand.Exists, 'Root|Child 1')).toBe('1');
    expect(await ControlTreeView(APP_TITLE, '', TREE_VIEW, TreeViewCommand.Expand, 'Root|Child 2')).toBe('1');
    expect(
      await ControlTreeView(APP_TITLE, '', TREE_VIEW, TreeViewCommand.GetItemCount, 'Root|Child 2'),
    ).toBe('3');

    const handle = await ControlGetHandle(windowHandle, TREE_VIEW);

    expect(
      await ControlTreeViewByHandle(windowHandle, handle, TreeViewCommand.Select, 'Root|Child 2|Child 2.2'),
    ).toBe('1');
    expect(await ControlTreeViewByHandle(windowHandle, handle, TreeViewCommand.GetSelected, '')).toBe(
      'Root|Child 2|Child 2.2',
    );
    expect(
      await ControlTreeViewByHandle(windowHandle, handle, TreeViewCommand.GetText, 'Root|Child 2|Child 2.2'),
    ).toBe('Child 2.2');
  });

  it('uses the mouse', async () => {
    const handle = await ControlGetHandle(windowHandle, OK_BUTTON);
    const windowRect = await WinGetPos(APP_TITLE);
    const buttonRect = await ControlGetPosByHandle(windowHandle, handle);

    const x = windowRect.left + buttonRect.left + 10;
    const y = windowRect.top + buttonRect.top + 10 + 43; // title bar height + menu height = 43

    // Mouse move
    expect(await MouseMove(x, y)).toBe(1);
    expect(await MouseGetPos()).toEqual({ x, y });

    // Mouse down/up
    await MouseDown(MouseButton.Left);
    await MouseUp(MouseButton.Left);

    expect(await WinWait(OK_TITLE, '', 1)).toBeGreaterThan(0);
    expect(await ControlClick(OK_TITLE, '', POPUP_BUTTON)).toBe(1);
    expect(await WinWaitClose(OK_TITLE, '', 1)).toBe(1);

    // Mouse click
    expect(await MouseClick(MouseButton.Left, x, y)).toBe(1);

    expect(await WinWait(OK_TITLE, '', 1)).toBeGreaterThan(0);
    expect(await ControlClick(OK_TITLE, '', POPUP_BUTTON)).toBe(1);
    expect(await WinWaitClose(OK_TITLE, '', 1)).toBe(1);

    // Mouse drag
    const pos = await MouseGetPos();

    expect(await MouseClickDrag(MouseButton.Left, pos.x, pos.y, pos.x + 10, pos.y + 10)).toBe(1);
    expect(await MouseGetPos()).toEqual({ x: pos.x + 10, y: pos.y + 10 });

    expect(await WinWait(OK_TITLE, '', 1)).toBeGreaterThan(0);
    expect(await ControlClick(OK_TITLE, '', POPUP_BUTTON)).toBe(1);
    expect(await WinWaitClose(OK_TITLE, '', 1)).toBe(1);

    // Mouse wheel
    await MouseWheel(ScrollDirection.Down, 20);
    expect(await ControlGetText(APP_TITLE, '', EVENT_LABEL)).toContain('Mouse Wheel Down');

    await MouseWheel(ScrollDirection.Up, 20);
    expect(await ControlGetText(APP_TITLE, '', EVENT_LABEL)).toContain('Mouse Wheel Up');

    // Mouse cursor
    expect(await MouseGetCursor()).toBe(Cursor.Arrow);
  });

  it('finds a pixel on the screen', async () => {
    expect(await WinActivate(APP_TITLE)).toBe(1);
    const rect = await WinGetPos(APP_TITLE);

    expect(await PixelSearch(rect.left, rect.top, rect.right, rect.bottom, 0xf14f21, 0, 1)).toEqual({
      x: rect.left + 395,
      y: rect.top + 546,
    });

    expect(await PixelSearch(rect.left, rect.top, rect.right, rect.bottom, 0x7fba00, 0, 1)).toEqual({
      x: rect.left + 420,
      y: rect.top + 546,
    });

    expect(await PixelSearch(rect.left, rect.top, rect.right, rect.bottom, 0x00a3ee, 0, 1)).toEqual({
      x: rect.left + 395,
      y: rect.top + 571,
    });

    expect(await PixelSearch(rect.left, rect.top, rect.right, rect.bottom, 0xfeb800, 0, 1)).toEqual({
      x: rect.left + 420,
      y: rect.top + 571,
    });

    expect(await PixelSearch(rect.left, rect.top, rect.right, rect.bottom, 0x123456, 0, 1)).toEqual({
      x: -1,
      y: -1,
    });
  });

  it('handles errors when searching for pixels', async () => {
    expect(await WinActivate(APP_TITLE)).toBe(1);
    const rect = await WinGetPos(APP_TITLE);

    const mockSelectObject = vi.spyOn(gdi32, 'SelectObject').mockResolvedValue(0n);
    expect(await PixelSearch(rect.left, rect.top, rect.right, rect.bottom, 0xf14f21, 0, 1)).toEqual({
      x: -1,
      y: -1,
    });
    mockSelectObject.mockRestore();

    const mockBitBlt = vi.spyOn(gdi32, 'BitBlt').mockResolvedValue(false);
    expect(await PixelSearch(rect.left, rect.top, rect.right, rect.bottom, 0x7fba00, 0, 1)).toEqual({
      x: -1,
      y: -1,
    });
    mockBitBlt.mockRestore();

    const mockGetDIBits = vi.spyOn(gdi32, 'GetDIBits').mockResolvedValue(0);
    expect(await PixelSearch(rect.left, rect.top, rect.right, rect.bottom, 0x00a3ee, 0, 1)).toEqual({
      x: -1,
      y: -1,
    });
    mockGetDIBits.mockRestore();
  });

  // TODO: Re-enable once async Tooltip is fixed
  // it('displays a tooltip', async () => {
  //   expect(await Tooltip('Test Tooltip', 100, 100, 20, 500)).toBe(true);
  // });

  // it('handles errors when displaying a tooltip', async () => {
  //   const mockSendMessageW = vi.spyOn(user32, 'SendMessageW').mockResolvedValueOnce(0);
  //   expect(await Tooltip('Test Tooltip', 100, 100, 20, 500)).toBe(false);
  //   mockSendMessageW.mockRestore();

  //   const mockDestroyWindow = vi.spyOn(user32, 'DestroyWindow').mockResolvedValueOnce(false);
  //   expect(await Tooltip('Test Tooltip', 100, 100, 20, 500)).toBe(false);
  //   mockDestroyWindow.mockRestore();
  // });
});
