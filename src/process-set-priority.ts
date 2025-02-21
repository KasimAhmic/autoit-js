import { INT, LPCWSTR } from './@types';
import { autoit } from './lib/autoit';

export enum Priority {
  Low = 0,
  BelowNormal = 1,
  Normal = 2,
  AboveNormal = 3,
  High = 4,
  Realtime = 5,
}

export function ProcessSetPriority(process: string, priority: Priority): number {
  return autoit.invoke('AU3_ProcessSetPriority', INT, [LPCWSTR, INT], [process, priority]);
}
