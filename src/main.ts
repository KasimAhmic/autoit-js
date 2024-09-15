import os from 'node:os';

import { AutoIt } from './autoit';
import { Logger } from './util/logger';

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

  logger.info('initial', au3.WinGetClassList('This PC'));

  logger.info('WinExists', au3.WinExists('This PC'));
  logger.info('WinClose', au3.WinClose('This PC'));
  logger.info('WinExists', au3.WinExists('This PC'));

  // logger.info('WinExists', au3.WinExistsByHandle(handle));
  // logger.info('WinClose', au3.WinCloseByHandle(handle));
  // logger.info('WinExists', au3.WinExistsByHandle(handle));

  // await new Promise((resolve) => setTimeout(resolve, 2500));

  // for (let i = 0; i < 1_000_000; i++) {
  //   process.stdout.write(`${i}\n`);
  //   au3.WinGetClassList('This PC');
  // }

  au3.unload();
}

main();
