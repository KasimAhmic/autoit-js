// import SegfaultHandler from 'segfault-handler';
import { AutoIt, MouseButton, MouseWheelDirection, WinVisibility } from './autoit';
import { AutoItOption } from './autoit/types/autoit-options';
import { Logger } from './util/logger';

// SegfaultHandler.registerHandler('crash.log');

const logger = new Logger('Main');

async function main() {
  const au3 = new AutoIt();

  au3.load();

  // logger.info('WinActive', au3.WinActive('This PC'));
  // logger.info('WinActivate', au3.WinActivate('This PC'));
  // logger.info('WinActive', au3.WinActive('This PC'));

  // logger.info('WinActive PowerShell', au3.WinActivate('Windows PowerShell'));

  // const handle = au3.WinGetHandle('This PC');

  // logger.info('WinGetHandle', handle);

  // logger.info('WinActiveByHandle', au3.WinActiveByHandle(handle));
  // logger.info('WinActivateByHandle', au3.WinActivateByHandle(handle));
  // logger.info('WinActiveByHandle', au3.WinActiveByHandle(handle));

  // logger.info('WinGetClassList', au3.WinGetClassList('This PC'));

  // logger.info('WinExists', au3.WinExists('This PC'));
  // logger.info('WinClose', au3.WinClose('This PC'));
  // logger.info('WinExists', au3.WinExists('This PC'));

  // logger.info('ClipPut', au3.ClipPut('Hello World!'));
  // logger.info('ClipGet', au3.ClipGet());

  // logger.info('IsAdmin', au3.IsAdmin());

  // logger.info('MouseGetPos', au3.MouseGetPos());
  // logger.info('MouseMove', au3.MouseMove(100, 100));
  // logger.info('MouseGetPos', au3.MouseGetPos());
  // logger.info('MouseMove', au3.MouseMove(400, 400));
  // logger.info('MouseGetPos', au3.MouseGetPos());
  // logger.info('MouseDown', au3.MouseDown(MouseButton.Right));
  // logger.info('MouseUp', au3.MouseUp(MouseButton.Right));
  // logger.info('MouseMove', au3.MouseMove(900, 900));
  // logger.info('MouseGetPos', au3.MouseGetPos());
  // logger.info('MouseUp', au3.MouseDown(MouseButton.Left));
  // logger.info('MouseUp', au3.MouseUp(MouseButton.Left));
  // logger.info('MouseMove', au3.MouseMove(2160 / 2, 1440 / 2));
  // logger.info('MouseWheel', au3.MouseWheel(MouseWheelDirection.Up, 1));
  // logger.info('MouseWheel', au3.MouseWheel(MouseWheelDirection.Up, 10));
  // logger.info('MouseWheel', au3.MouseWheel(MouseWheelDirection.Up, 100));
  // logger.info('MouseWheel', au3.MouseWheel(MouseWheelDirection.Down, 1));
  // logger.info('MouseWheel', au3.MouseWheel(MouseWheelDirection.Down, 10));
  // logger.info('MouseWheel', au3.MouseWheel(MouseWheelDirection.Down, 100));
  // logger.info('MouseClick', au3.MouseClick(MouseButton.Right, 2160 / 2, 1440 / 2));
  // logger.info('MouseClick', au3.MouseClick(MouseButton.Left, 2160 / 2 - 20, 1440 / 2 - 20));
  // logger.info(
  //   'MouseClickDrag',
  //   au3.MouseClickDrag(MouseButton.Left, 2160 / 2, 1440 / 2, 2160 / 2 + 300, 1440 / 2 + 300),
  // );

  // logger.info('AutoItSetOption', au3.AutoItSetOption(AutoItOption.WinTitleMatchMode, 1));
  // logger.info('WinExists (true)', au3.WinExists('This'));
  // logger.info('WinExists (false)', au3.WinExists('is PC'));
  // logger.info('AutoItSetOption', au3.AutoItSetOption(AutoItOption.WinTitleMatchMode, 2));
  // logger.info('WinExists (true)', au3.WinExists('is PC'));
  // logger.info('WinExists (true)', au3.WinExists('This PC'));
  // logger.info('AutoItSetOption', au3.AutoItSetOption(AutoItOption.WinTitleMatchMode, 3));
  // logger.info('WinExists (true)', au3.WinExists('This PC'));
  // logger.info('WinExists (false)', au3.WinExists('This PCs'));
  // logger.info('AutoItSetOption', au3.AutoItSetOption(AutoItOption.WinTitleMatchMode, 1));

  // const handle = au3.WinGetHandle('This PC');
  // logger.info('WinExists', au3.WinExists('This PC'));
  // logger.info('WinGetClientSize', au3.WinGetClientSize('This PC'));
  // logger.info('WinGetClientSizeByHandle', au3.WinGetClientSizeByHandle(handle));

  // logger.info('WinGetPos', au3.WinGetPos('This PC'));
  // logger.info('WinGetPosByHandle', au3.WinGetPosByHandle(handle));
  // logger.info('WinGetProcess', au3.WinGetProcess('Untitled - Notepad'));
  // logger.info('WinGetProcessByHandle', au3.WinGetProcessByHandle(au3.WinGetHandle('Untitled - Notepad')));

  // logger.info('WinGetTitle', au3.WinGetTitle('This PC'));
  // logger.info('WinGetTitleByHandle', au3.WinGetTitleByHandle(handle));

  // logger.info('WinMove', au3.WinMove('This PC', '', 0, 0, 500, 500));
  // au3.Sleep(1000);
  // logger.info('WinMove', au3.WinMove('This PC', '', 500, 500, 1000, 1000));

  // au3.Sleep(1000);
  // logger.info('WinMoveByHandle', au3.WinMoveByHandle(handle, -500, 0, 500, 500));
  // au3.Sleep(1000);
  // logger.info('WinMoveByHandle', au3.WinMoveByHandle(handle, -1000, 500, 700, 400));

  // au3.Run('notepad.exe');

  // au3.Sleep(5000);

  logger.info('PixelGetColor', au3.PixelGetColor(100, 100));

  au3.unload();
}

main();
