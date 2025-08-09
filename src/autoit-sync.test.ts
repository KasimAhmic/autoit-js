import { randomUUID } from 'node:crypto';
import { statSync } from 'node:fs';

import {
  ABOUT_EDIT,
  APP_TITLE,
  CANCEL_BUTTON,
  CANCEL_TITLE,
  EVENT_LABEL,
  FIRST_NAME_EDIT,
  LAST_NAME_EDIT,
  LIST_VIEW,
  OK_BUTTON,
  OK_TITLE,
  POPUP_BUTTON,
  PROCESS_NAME,
  STATIC_LABEL,
  TEST_APP_PATH,
  TREE_VIEW,
} from './@testing/test-constants';
import { ClipGetSync } from './clip-get';
import { ClipPutSync } from './clip-put';
import { ControlClickSync } from './control-click';
import { ControlClickByHandleSync } from './control-click-by-handle';
import { ControlDisableSync } from './control-disable';
import { ControlDisableByHandleSync } from './control-disable-by-handle';
import { ControlEnableSync } from './control-enable';
import { ControlEnableByHandleSync } from './control-enable-by-handle';
import { ControlFocusSync } from './control-focus';
import { ControlFocusByHandleSync } from './control-focus-by-handle';
import { ControlGetFocusSync } from './control-get-focus';
import { ControlGetFocusByHandleSync } from './control-get-focus-by-handle';
import { ControlGetHandleSync } from './control-get-handle';
import { ControlGetHandleAsTextSync } from './control-get-handle-as-text';
import { ControlGetPosSync } from './control-get-pos';
import { ControlGetPosByHandleSync } from './control-get-pos-by-handle';
import { ControlGetTextSync } from './control-get-text';
import { ControlGetTextByHandleSync } from './control-get-text-by-handle';
import { ControlHideSync } from './control-hide';
import { ControlHideByHandleSync } from './control-hide-by-handle';
import { ControlListViewSync, ListViewCommand } from './control-list-view';
import { ControlListViewByHandleSync } from './control-list-view-by-handles';
import { ControlMoveSync } from './control-move';
import { ControlMoveByHandleSync } from './control-move-by-handle';
import { ControlSetTextSync } from './control-set-text';
import { ControlSetTextByHandleSync } from './control-set-text-by-handle';
import { ControlShowSync } from './control-show';
import { ControlShowByHandleSync } from './control-show-by-handle';
import { ControlTreeViewSync, TreeViewCommand } from './control-tree-view';
import { ControlTreeViewByHandleSync } from './control-tree-view-by-handle';
import { autoit } from './lib/autoit';
import * as gdi32 from './lib/gdi32';
import * as user32 from './lib/user32';
import { MouseButton, MouseClickSync } from './mouse-click';
import { MouseClickDragSync } from './mouse-click-drag';
import { MouseDownSync } from './mouse-down';
import { Cursor, MouseGetCursorSync } from './mouse-get-cursor';
import { MouseGetPosSync } from './mouse-get-pos';
import { MouseMoveSync } from './mouse-move';
import { MouseUpSync } from './mouse-up';
import { MouseWheelSync, ScrollDirection } from './mouse-wheel';
import { PixelGetColorSync } from './pixel-get-color';
import { PixelSearchSync } from './pixel-search';
import { ProcessCloseSync } from './process-close';
import { Priority, ProcessSetPrioritySync } from './process-set-priority';
import { RunSync } from './run';
import { StatusbarGetTextSync } from './statusbar-get-text';
import { StatusbarGetTextByHandleSync } from './statusbar-get-text-by-handle';
import { TooltipSync } from './tooltip';
import { WinActivateSync } from './win-activate';
import { WinGetClassListSync } from './win-get-class-list';
import { WinGetClassListByHandleSync } from './win-get-class-list-by-handle';
import { WinGetClientSizeSync } from './win-get-client-size';
import { WinGetClientSizeByHandleSync } from './win-get-client-size-by-handle';
import { WinGetHandleSync } from './win-get-handle';
import { WinGetHandleAsTextSync } from './win-get-handle-as-text';
import { WinGetPosSync } from './win-get-pos';
import { WinGetPosByHandleSync } from './win-get-pos-by-handle';
import { WinGetProcessSync } from './win-get-process';
import { WinGetProcessByHandleSync } from './win-get-process-by-handle';
import { WinGetStateSync } from './win-get-state';
import { WinGetStateByHandleSync } from './win-get-state-by-handle';
import { WinGetTextSync } from './win-get-text';
import { WinGetTextByHandleSync } from './win-get-text-by-handle';
import { WinGetTitleSync } from './win-get-title';
import { WinGetTitleByHandleSync } from './win-get-title-by-handle';
import { WinMenuSelectItemSync } from './win-menu-select-item';
import { WinMenuSelectItemByHandleSync } from './win-menu-select-item-by-handle';
import { WinMinimizeAllSync } from './win-minimize-all';
import { WinMinimizeAllUndoSync } from './win-minimize-all-undo';
import { WinMoveSync } from './win-move';
import { WinMoveByHandleSync } from './win-move-by-handle';
import { WinSetOnTopSync } from './win-set-on-top';
import { StateFlag, WinSetStateSync } from './win-set-state';
import { WinSetStateByHandleSync } from './win-set-state-by-handle';
import { WinSetTitleSync } from './win-set-title';
import { WinSetTitleByHandleSync } from './win-set-title-by-handle';
import { WinSetTransSync } from './win-set-trans';
import { WinSetTransByHandleSync } from './win-set-trans-by-handle';
import { WinWaitSync } from './win-wait';
import { WinWaitCloseSync } from './win-wait-close';

describe.sequential('AutoIt JS @full', () => {
  let windowHandle: bigint;

  beforeAll(() => {
    autoit.load();
    ProcessCloseSync('TestApp.exe');

    expect(statSync(TEST_APP_PATH).isFile()).toBe(true);

    expect(RunSync(TEST_APP_PATH)).toBeGreaterThan(0);
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

    const handle = ControlGetHandleSync(windowHandle, LIST_VIEW);

    expect(ControlListViewByHandleSync(windowHandle, handle, ListViewCommand.Select, '1')).toBe('1');
    expect(ControlListViewByHandleSync(windowHandle, handle, ListViewCommand.IsSelected, '1')).toBe('1');
    expect(ControlListViewByHandleSync(windowHandle, handle, ListViewCommand.IsSelected, '2')).toBe('0');
    expect(ControlListViewByHandleSync(windowHandle, handle, ListViewCommand.SelectInvert)).toBe('1');
    expect(ControlListViewByHandleSync(windowHandle, handle, ListViewCommand.GetSelectedCount)).toBe('49');

    expect(ControlListViewByHandleSync(windowHandle, handle, ListViewCommand.DeSelect, '0', '50')).toBe('1');
    expect(ControlListViewByHandleSync(windowHandle, handle, ListViewCommand.GetSelectedCount)).toBe('0');

    expect(ControlListViewByHandleSync(windowHandle, handle, ListViewCommand.Select, '1', '20')).toBe('1');
    expect(ControlListViewByHandleSync(windowHandle, handle, ListViewCommand.GetSelected)).toBe('1');
    expect(ControlListViewByHandleSync(windowHandle, handle, ListViewCommand.GetSelected, '1')).toBe(
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

  it('gets the text of the window', () => {
    const windowText = WinGetTextSync(APP_TITLE);

    expect(windowText.length).toBeGreaterThan(100);
    expect(WinGetTextByHandleSync(windowHandle)).toBe(windowText);
    expect(WinGetTextSync(APP_TITLE, '', 100)).toBe(windowText.slice(0, 100));
    expect(WinGetTextByHandleSync(windowHandle, 100)).toBe(windowText.slice(0, 100));
  });

  it('sets the process priority', () => {
    expect(ProcessSetPrioritySync(PROCESS_NAME, Priority.High)).toBe(1);
    expect(ProcessSetPrioritySync(PROCESS_NAME, Priority.Normal)).toBe(1);
  });

  it('gets the process ID of the window', () => {
    const processId = WinGetProcessSync(APP_TITLE);
    expect(processId).toBeGreaterThan(0);
    expect(WinGetProcessByHandleSync(windowHandle)).toBe(processId);
  });

  it('gets the window handle', () => {
    const handle = WinGetHandleSync(APP_TITLE);
    const textHandle = WinGetHandleAsTextSync(APP_TITLE);

    expect(handle).toBe(windowHandle);
    expect(parseInt(textHandle, 16)).toBe(Number(windowHandle));
  });

  it('gets the client size', () => {
    const rect = WinGetClientSizeSync(APP_TITLE);

    expect(rect).toEqual(WinGetClientSizeByHandleSync(windowHandle));
  });

  it('minimizes and restores all windows', () => {
    expect(WinMinimizeAllSync()).toBe(undefined);
    expect(WinMinimizeAllUndoSync()).toBe(undefined);
  });

  it('gets the class list of the window', () => {
    const classList = WinGetClassListSync(APP_TITLE);
    expect(WinGetClassListByHandleSync(windowHandle)).toBe(classList);
  });

  it('interacts with a tree view', () => {
    expect(ControlTreeViewSync(APP_TITLE, '', TREE_VIEW, TreeViewCommand.GetItemCount)).toBe('1');
    expect(ControlTreeViewSync(APP_TITLE, '', TREE_VIEW, TreeViewCommand.Exists, 'Root|Child 1')).toBe('1');
    expect(ControlTreeViewSync(APP_TITLE, '', TREE_VIEW, TreeViewCommand.Expand, 'Root|Child 2')).toBe('1');
    expect(ControlTreeViewSync(APP_TITLE, '', TREE_VIEW, TreeViewCommand.GetItemCount, 'Root|Child 2')).toBe(
      '3',
    );

    const handle = ControlGetHandleSync(windowHandle, TREE_VIEW);

    expect(
      ControlTreeViewByHandleSync(windowHandle, handle, TreeViewCommand.Select, 'Root|Child 2|Child 2.2'),
    ).toBe('1');
    expect(ControlTreeViewByHandleSync(windowHandle, handle, TreeViewCommand.GetSelected, '')).toBe(
      'Root|Child 2|Child 2.2',
    );
    expect(
      ControlTreeViewByHandleSync(windowHandle, handle, TreeViewCommand.GetText, 'Root|Child 2|Child 2.2'),
    ).toBe('Child 2.2');
  });

  it('uses the mouse', () => {
    const handle = ControlGetHandleSync(windowHandle, OK_BUTTON);
    const windowRect = WinGetPosSync(APP_TITLE);
    const buttonRect = ControlGetPosByHandleSync(windowHandle, handle);

    const x = windowRect.left + buttonRect.left + 10;
    const y = windowRect.top + buttonRect.top + 10 + 43; // title bar height + menu height = 43

    // Mouse move
    expect(MouseMoveSync(x, y)).toBe(1);
    expect(MouseGetPosSync()).toEqual({ x, y });

    // Mouse down/up
    MouseDownSync(MouseButton.Left);
    MouseUpSync(MouseButton.Left);

    expect(WinWaitSync(OK_TITLE, '', 1)).toBeGreaterThan(0);
    expect(ControlClickSync(OK_TITLE, '', POPUP_BUTTON)).toBe(1);
    expect(WinWaitCloseSync(OK_TITLE, '', 1)).toBe(1);

    // Mouse click
    expect(MouseClickSync(MouseButton.Left, x, y)).toBe(1);

    expect(WinWaitSync(OK_TITLE, '', 1)).toBeGreaterThan(0);
    expect(ControlClickSync(OK_TITLE, '', POPUP_BUTTON)).toBe(1);
    expect(WinWaitCloseSync(OK_TITLE, '', 1)).toBe(1);

    // Mouse drag
    const pos = MouseGetPosSync();

    expect(MouseClickDragSync(MouseButton.Left, pos.x, pos.y, pos.x + 10, pos.y + 10)).toBe(1);
    expect(MouseGetPosSync()).toEqual({ x: pos.x + 10, y: pos.y + 10 });

    expect(WinWaitSync(OK_TITLE, '', 1)).toBeGreaterThan(0);
    expect(ControlClickSync(OK_TITLE, '', POPUP_BUTTON)).toBe(1);
    expect(WinWaitCloseSync(OK_TITLE, '', 1)).toBe(1);

    // Mouse wheel
    MouseWheelSync(ScrollDirection.Down, 20);
    expect(ControlGetTextSync(APP_TITLE, '', EVENT_LABEL)).toContain('Mouse Wheel Down');

    MouseWheelSync(ScrollDirection.Up, 20);
    expect(ControlGetTextSync(APP_TITLE, '', EVENT_LABEL)).toContain('Mouse Wheel Up');

    // Mouse cursor
    expect(MouseGetCursorSync()).toBe(Cursor.Arrow);
  });

  it('finds a pixel on the screen', () => {
    expect(WinActivateSync(APP_TITLE)).toBe(1);
    const rect = WinGetPosSync(APP_TITLE);

    expect(PixelSearchSync(rect.left, rect.top, rect.right, rect.bottom, 0xf14f21, 0, 1)).toEqual({
      x: rect.left + 395,
      y: rect.top + 546,
    });

    expect(PixelSearchSync(rect.left, rect.top, rect.right, rect.bottom, 0x7fba00, 0, 1)).toEqual({
      x: rect.left + 420,
      y: rect.top + 546,
    });

    expect(PixelSearchSync(rect.left, rect.top, rect.right, rect.bottom, 0x00a3ee, 0, 1)).toEqual({
      x: rect.left + 395,
      y: rect.top + 571,
    });

    expect(PixelSearchSync(rect.left, rect.top, rect.right, rect.bottom, 0xfeb800, 0, 1)).toEqual({
      x: rect.left + 420,
      y: rect.top + 571,
    });

    expect(PixelSearchSync(rect.left, rect.top, rect.right, rect.bottom, 0x123456, 0, 1)).toEqual({
      x: -1,
      y: -1,
    });
  });

  it('handles errors when searching for pixels', () => {
    expect(WinActivateSync(APP_TITLE)).toBe(1);
    const rect = WinGetPosSync(APP_TITLE);

    const mockSelectObjectSync = vi.spyOn(gdi32, 'SelectObjectSync').mockReturnValue(0n);
    expect(PixelSearchSync(rect.left, rect.top, rect.right, rect.bottom, 0xf14f21, 0, 1)).toEqual({
      x: -1,
      y: -1,
    });
    mockSelectObjectSync.mockRestore();

    const mockBitBltSync = vi.spyOn(gdi32, 'BitBltSync').mockReturnValue(false);
    expect(PixelSearchSync(rect.left, rect.top, rect.right, rect.bottom, 0x7fba00, 0, 1)).toEqual({
      x: -1,
      y: -1,
    });
    mockBitBltSync.mockRestore();

    const mockGetDIBitsSync = vi.spyOn(gdi32, 'GetDIBitsSync').mockReturnValue(0);
    expect(PixelSearchSync(rect.left, rect.top, rect.right, rect.bottom, 0x00a3ee, 0, 1)).toEqual({
      x: -1,
      y: -1,
    });
    mockGetDIBitsSync.mockRestore();
  });

  it('displays a tooltip', () => {
    expect(TooltipSync('Test Tooltip', 100, 100, 20, 500)).toBe(true);
  });

  it('handles errors when displaying a tooltip', () => {
    const mockSendMessageWSync = vi.spyOn(user32, 'SendMessageWSync').mockReturnValueOnce(0);
    expect(TooltipSync('Test Tooltip', 100, 100, 20, 500)).toBe(false);
    mockSendMessageWSync.mockRestore();

    const mockDestroyWindowSync = vi.spyOn(user32, 'DestroyWindowSync').mockReturnValueOnce(false);
    expect(TooltipSync('Test Tooltip', 100, 100, 20, 500)).toBe(false);
    mockDestroyWindowSync.mockRestore();
  });
});
