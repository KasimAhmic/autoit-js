import { HWND, INT } from './@types/win32';
import { autoit } from './autoit/autoit';
import { WindowProperty, WindowState } from './win-get-state';

export function WinGetStateByHandle(windowHandle: bigint): WindowState {
  const state = autoit.invoke('AU3_WinGetStateByHandle', INT, [HWND], [windowHandle]);

  return {
    exists: (state & WindowProperty.Exists) === WindowProperty.Exists,
    visible: (state & WindowProperty.Visible) === WindowProperty.Visible,
    enabled: (state & WindowProperty.Enabled) === WindowProperty.Enabled,
    active: (state & WindowProperty.Active) === WindowProperty.Active,
    minimized: (state & WindowProperty.Minimized) === WindowProperty.Minimized,
    maximized: (state & WindowProperty.Maximized) === WindowProperty.Maximized,
  };
}
