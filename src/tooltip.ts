import koffi from 'koffi';

import { TOOLINFOW, ToolInfoW } from './@types/tool-info';
import { WinSleep, WinSleepSync } from './lib/kernel32';
import {
  CreateWindowExWSync,
  DestroyWindowSync,
  GetDesktopWindowSync,
  MAKELPARAM,
  SendMessageWSync,
} from './lib/user32';

const CW_USEDEFAULT = 0x80000000;

const WM_USER = 0x0400;

const WS_POPUP = 0x80000000;
const WS_EX_TOPMOST = 0x00000008;

const TTS_NOPREFIX = 0x02;
const TTS_ALWAYSTIP = 0x01;
const TTS_BALLOON = 0x40;

const TTF_TRACK = 0x0020;
const TTF_ABSOLUTE = 0x0080;

const TTM_ADDTOOLW = WM_USER + 50;
const TTM_TRACKACTIVATE = WM_USER + 17;
const TTM_TRACKPOSITION = WM_USER + 18;
const TTM_SETMAXTIPWIDTH = WM_USER + 24;

/**
 * SendMessageW return values for specific messages.
 *
 * | Message              | Return Value                 |
 * |:---------------------|:-----------------------------|
 * | `TTM_ADDTOOLW`       | 1 if successful, otherwise 0 |
 * | `TTM_SETMAXTIPWIDTH` | Previous width               |
 * | `TTM_TRACKPOSITION`  | Unused                       |
 * | `TTM_TRACKACTIVATE`  | Unused                       |
 */

/**
 * Display a tooltip with the specified value at the specified position.
 *
 * The actual `AU3_Tooltip` function from AutoIt appears to be broken so it has been reimplemented here using
 * the Windows User32 library.
 *
 * @param value The text to display in the tooltip.
 * @param x The x-coordinate of the tooltip position. Default is 0.
 * @param y The y-coordinate of the tooltip position. Default is 0.
 * @param width The maximum width of the tooltip in pixels. Default is 400.
 * @param timeout The duration in milliseconds to display the tooltip. Default is 2000.
 *
 * @returns True if the tooltip was displayed successfully, otherwise false.
 *
 * @example
 * ```typescript
 * import { TooltipSync } from '@ahmic/autoit-js';
 *
 * TooltipSync('Hello, World!', 100, 200, 20, 3000);
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/ToolTip.htm
 */
export function TooltipSync(
  value: string,
  x: number = 0,
  y: number = 0,
  width: number = 400,
  timeout: number = 2000,
): boolean {
  const tooltipHandle = CreateWindowExWSync(
    WS_EX_TOPMOST,
    'tooltips_class32',
    null,
    WS_POPUP | TTS_NOPREFIX | TTS_ALWAYSTIP | TTS_BALLOON,
    CW_USEDEFAULT,
    CW_USEDEFAULT,
    CW_USEDEFAULT,
    CW_USEDEFAULT,
    null,
    null,
    null,
    null,
  );

  const toolInfo = koffi.alloc(TOOLINFOW, koffi.sizeof(TOOLINFOW));

  koffi.encode(
    toolInfo,
    0,
    TOOLINFOW,
    new ToolInfoW({
      uId: 1,
      hwnd: GetDesktopWindowSync(),
      uFlags: TTF_TRACK | TTF_ABSOLUTE,
      lpszText: value,
    }),
  );

  const toolInfoPointer = koffi.address(toolInfo);

  const addTooltipSuccess = SendMessageWSync(tooltipHandle, TTM_ADDTOOLW, 0, toolInfoPointer);

  if (!addTooltipSuccess) {
    DestroyWindowSync(tooltipHandle);
    koffi.free(toolInfo);
    return false;
  }

  SendMessageWSync(tooltipHandle, TTM_SETMAXTIPWIDTH, 0, width);
  SendMessageWSync(tooltipHandle, TTM_TRACKPOSITION, 0, MAKELPARAM(x, y));
  SendMessageWSync(tooltipHandle, TTM_TRACKACTIVATE, 1, toolInfoPointer);

  WinSleepSync(timeout);

  SendMessageWSync(tooltipHandle, TTM_TRACKACTIVATE, 0, toolInfoPointer);
  const destroyWindowSuccess = DestroyWindowSync(tooltipHandle);

  if (!destroyWindowSuccess) {
    koffi.free(toolInfo);
    return false;
  }

  koffi.free(toolInfo);

  return true;
}

/**
 * Display a tooltip with the specified value at the specified position.
 *
 * The actual `AU3_Tooltip` function from AutoIt appears to be broken so it has been reimplemented here using
 * the Windows User32 library.
 *
 * **NOTE**: While this function is primarily asynchronous, it uses the synchronous variants of some of the
 * Win32 functions as the async variants cause undefined behaviour where the promises never resolve. These
 * functions are quite fast and tooltips are unlikely to be used extensively so this should not cause any
 * issues (famous last words...). The Sleep call is still asynchronous, so the tooltip will not block the
 * event loop while it is displayed, only during creation and destruction of the tooltip window. If you run
 * into any issues with this, please open an issue!
 *
 * @param value The text to display in the tooltip.
 * @param x The x-coordinate of the tooltip position. Default is 0.
 * @param y The y-coordinate of the tooltip position. Default is 0.
 * @param width The maximum width of the tooltip in pixels. Default is 400.
 * @param timeout The duration in milliseconds to display the tooltip. Default is 2000.
 *
 * @example
 * ```typescript
 * import { Tooltip } from '@ahmic/autoit-js';
 *
 * await Tooltip('Hello, World!', 100, 200, 20, 3000);
 * ```
 *
 * @see https://www.autoitscript.com/autoit3/docs/functions/ToolTip.htm
 */
export async function Tooltip(
  value: string,
  x: number = 0,
  y: number = 0,
  width: number = 400,
  timeout: number = 2000,
): Promise<boolean> {
  const tooltipHandle = CreateWindowExWSync(
    WS_EX_TOPMOST,
    'tooltips_class32',
    null,
    WS_POPUP | TTS_NOPREFIX | TTS_ALWAYSTIP | TTS_BALLOON,
    CW_USEDEFAULT,
    CW_USEDEFAULT,
    CW_USEDEFAULT,
    CW_USEDEFAULT,
    null,
    null,
    null,
    null,
  );

  const toolInfo = koffi.alloc(TOOLINFOW, koffi.sizeof(TOOLINFOW));

  koffi.encode(
    toolInfo,
    0,
    TOOLINFOW,
    new ToolInfoW({
      uId: 1,
      hwnd: GetDesktopWindowSync(),
      uFlags: TTF_TRACK | TTF_ABSOLUTE,
      lpszText: value,
    }),
  );

  const toolInfoPointer = koffi.address(toolInfo);

  const addToolResult = SendMessageWSync(tooltipHandle, TTM_ADDTOOLW, 0, toolInfoPointer);

  if (!addToolResult) {
    DestroyWindowSync(tooltipHandle);
    koffi.free(toolInfo);
    return false;
  }

  SendMessageWSync(tooltipHandle, TTM_SETMAXTIPWIDTH, 0, width);
  SendMessageWSync(tooltipHandle, TTM_TRACKPOSITION, 0, MAKELPARAM(x, y));
  SendMessageWSync(tooltipHandle, TTM_TRACKACTIVATE, 1, toolInfoPointer);

  await WinSleep(timeout);

  SendMessageWSync(tooltipHandle, TTM_TRACKACTIVATE, 0, toolInfoPointer);
  const destryoWindowResult = DestroyWindowSync(tooltipHandle);

  koffi.free(toolInfo);

  return !!destryoWindowResult;
}
