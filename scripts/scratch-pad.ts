import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const {
  Load,
  Run,
  WinWait,
  WinGetHandle,
  ControlGetPos,
  WinGetPos,
  ControlMove,
  WinSetTrans,
  WinSetTransByHandle,
  Sleep,
  Unload,
  WinCloseByHandle,
  WinExists,
  WinExistsByHandle,
  WinActive,
  WinActiveByHandle,
  WinActivate,
  WinSetTitle,
  WinSetTitleByHandle,
} = require('../build/Release/autoit_js');

const boldYellow = '\x1b[1;33m';
const boldGreen = '\x1b[1;32m';
const green = '\x1b[32m';
const cyan = '\x1b[36m';
const magenta = '\x1b[1;35m';
const boldRed = '\x1b[1;31m';
const reset = '\x1b[1;0m';

function line(padEnd: number) {
  const error = new Error();
  const callerLine = error.stack?.split('\n')[3];
  const match = callerLine?.match(/(.*):(\d+):(\d+)/);

  return (match ? `L${match?.[2]}` : 'L?').padEnd(padEnd);
}

function flatJson(obj: object) {
  return obj && typeof obj === 'object'
    ? JSON.stringify(obj, (key, value) => value, 0)
        .replaceAll('{', '{ ')
        .replaceAll('[', '[ ')
        .replaceAll(':', ': ')
        .replaceAll(',"', ', "')
        .replaceAll(']', ' ]')
        .replaceAll('}', ' }')
    : JSON.stringify(obj);
}

/**
 *
 * @param {Function} fn
 * @param {...any} args
 * @returns {{success: boolean, value: any, code: number}}
 */
function invoke(fn: (...args: any[]) => any, ...args: any[]) {
  const lineNumber = `${magenta}[ ${line(4)} ]${reset}`;
  const fnName = `${boldYellow}${fn.name}${reset}`;
  const fnArgs = args.map((arg) => `${cyan}${JSON.stringify(arg)}${reset}`).join(', ');
  const arrow = `${boldGreen}=>${reset}`;

  const result = fn(...args);
  const formattedResult = flatJson(result);
  const fnResult = `${green}${formattedResult}${reset}`;

  const status = result.isSuccess ? `${boldGreen}[√]${reset}` : `${boldRed}[X]${reset}`;

  process.stdout.write(`${lineNumber} ${status} - ${fnName}(${fnArgs}) ${arrow} ${fnResult}\n`);

  return result;
}

invoke(Load);

invoke(Run, 'notepad.exe', '', 1);
invoke(WinWait, 'Untitled - Notepad', '', 5);

const { value: handle } = invoke(WinGetHandle, 'Untitled - Notepad', '');
invoke(WinExists, 'Untitled - Notepad', '');
invoke(WinExistsByHandle, handle);
invoke(ControlGetPos, 'Untitled - Notepad', '', 'Edit1');
invoke(WinGetPos, 'Untitled - Notepad', '');
invoke(ControlMove, 'Untitled - Notepad', '', 'Edit1', 20, 20, 50, 50);
invoke(ControlGetPos, 'Untitled - Notepad', '', 'Edit1');

invoke(WinSetTrans, 'Untitled - Notepad', '', 60);
invoke(Sleep, 2000);
invoke(WinActivate, 'Untitled - Notepad', '');
invoke(WinSetTransByHandle, handle, 255);
invoke(Sleep, 2000);
invoke(WinActive, 'Untitled - Notepad', '');
invoke(WinActiveByHandle, handle);
invoke(WinSetTitle, 'Untitled - Notepad', '', 'Hello World');
invoke(Sleep, 2000);
invoke(WinSetTitleByHandle, handle, 'Hello World By Handle!');
invoke(Sleep, 2000);
invoke(WinCloseByHandle, handle);

invoke(Unload);
