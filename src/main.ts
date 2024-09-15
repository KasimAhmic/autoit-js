// import SegfaultHandler from 'segfault-handler';
import { AutoIt, MouseButton } from './autoit';
import { Logger } from './util/logger';

// SegfaultHandler.registerHandler('crash.log');

const logger = new Logger('Main');

async function main() {
  const au3 = new AutoIt();

  au3.load();

  logger.info('WinActive', au3.WinActive('This PC'));
  logger.info('WinActivate', au3.WinActivate('This PC'));
  logger.info('WinActive', au3.WinActive('This PC'));

  logger.info('WinActive PowerShell', au3.WinActivate('Windows PowerShell'));

  const handle = au3.WinGetHandle('This PC');

  logger.info('WinGetHandle', handle);

  logger.info('WinActiveByHandle', au3.WinActiveByHandle(handle));
  logger.info('WinActivateByHandle', au3.WinActivateByHandle(handle));
  logger.info('WinActiveByHandle', au3.WinActiveByHandle(handle));

  logger.info('WinGetClassList', au3.WinGetClassList('This PC'));

  logger.info('WinExists', au3.WinExists('This PC'));
  logger.info('WinClose', au3.WinClose('This PC'));
  logger.info('WinExists', au3.WinExists('This PC'));

  logger.info('ClipPut', au3.ClipPut('Hello World!'));
  logger.info('ClipGet', au3.ClipGet());

  logger.info('IsAdmin', au3.IsAdmin());

  logger.info('MouseGetPos', au3.MouseGetPos());
  logger.info('MouseMove', au3.MouseMove(100, 100));
  logger.info('MouseGetPos', au3.MouseGetPos());
  logger.info('MouseMove', au3.MouseMove(400, 400));
  logger.info('MouseGetPos', au3.MouseGetPos());
  logger.info('MouseDown', au3.MouseDown(MouseButton.Right));
  logger.info('MouseUp', au3.MouseUp(MouseButton.Right));
  logger.info('MouseMove', au3.MouseMove(900, 900));
  logger.info('MouseGetPos', au3.MouseGetPos());
  logger.info('MouseUp', au3.MouseDown(MouseButton.Left));
  logger.info('MouseUp', au3.MouseUp(MouseButton.Left));

  au3.unload();
}

main();
