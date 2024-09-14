import { AutoIt } from './autoit';
import { Logger } from './util/logger';

const logger = new Logger('Main');

const au3 = new AutoIt();

au3.load();

au3.Init();

logger.info('WinActive', au3.WinActive('This PC'));
logger.info('WinActivate', au3.WinActivate('This PC'));
logger.info('WinActive', au3.WinActive('This PC'));

logger.info('WinActive PowerShell', au3.WinActivate('Windows PowerShell'));

const handle = au3.WinGetHandle('This PC');

logger.info('WinGetHandle', handle);

logger.info('WinActiveByHandle', au3.WinActiveByHandle(handle));
logger.info('WinActivateByHandle', au3.WinActivateByHandle(handle));
logger.info('WinActiveByHandle', au3.WinActiveByHandle(handle));

au3.unload();
