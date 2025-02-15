import { INT, LPCWSTR } from './@types/win32';
import { autoit } from './autoit/autoit';

export enum WindowProperty {
  Exists = 1,
  Visible = 2,
  Enabled = 4,
  Active = 8,
  Minimized = 16,
  Maximized = 32,
}

export type WindowState = {
  exists: boolean;
  visible: boolean;
  enabled: boolean;
  active: boolean;
  minimized: boolean;
  maximized: boolean;
};

export function WinGetState(title: string, text: string = ''): WindowState {
  const state = autoit.invoke('AU3_WinGetState', INT, [LPCWSTR, LPCWSTR], [title, text]);

  return {
    exists: (state & WindowProperty.Exists) === WindowProperty.Exists,
    visible: (state & WindowProperty.Visible) === WindowProperty.Visible,
    enabled: (state & WindowProperty.Enabled) === WindowProperty.Enabled,
    active: (state & WindowProperty.Active) === WindowProperty.Active,
    minimized: (state & WindowProperty.Minimized) === WindowProperty.Minimized,
    maximized: (state & WindowProperty.Maximized) === WindowProperty.Maximized,
  };
}
