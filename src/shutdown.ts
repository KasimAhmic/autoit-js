import { INT } from './@types/win32';
import { autoit } from './autoit/autoit';

export enum ShutdownFlag {
  Logoff = 0,
  Shutdown = 1,
  Reboot = 2,
  Force = 4,
  PowerDown = 8,
  ForceHung = 16,
  Standby = 32,
  Hibernate = 64,
}

export function Shutdown(flags: ShutdownFlag): number {
  return autoit.invoke('AU3_Shutdown', INT, [INT], [flags]);
}
