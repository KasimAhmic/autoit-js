import koffi from 'koffi';

import { WinSleep } from './@types/kernel32';
import { TOOLINFOW, ToolInfoW } from './@types/tool-info';
import { CreateWindowExW, DestroyWindow, SendMessageW } from './lib/user32';

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

function MAKELPARAM(low: number, high: number): number {
  return (low & 0xffff) | ((high & 0xffff) << 16);
}

export function Tooltip(
  value: string,
  x: number = 0,
  y: number = 0,
  characterWidth: number = 200,
  timeout: number = 2000,
): void {
  const tooltipHandle = CreateWindowExW(
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
      uFlags: TTF_TRACK | TTF_ABSOLUTE,
      lpszText: value,
    }),
  );

  const toolInfoPointer = koffi.address(toolInfo);

  SendMessageW(tooltipHandle, TTM_ADDTOOLW, 0, toolInfoPointer);
  SendMessageW(tooltipHandle, TTM_SETMAXTIPWIDTH, 0, characterWidth);
  SendMessageW(tooltipHandle, TTM_TRACKPOSITION, 0, MAKELPARAM(x, y));
  SendMessageW(tooltipHandle, TTM_TRACKACTIVATE, 1, toolInfoPointer);

  WinSleep(timeout);

  SendMessageW(tooltipHandle, TTM_TRACKACTIVATE, 0, toolInfoPointer);
  DestroyWindow(tooltipHandle);
}
