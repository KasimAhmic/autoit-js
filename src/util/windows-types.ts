import koffi from 'koffi';

export const WORD = koffi.alias('WORD', 'uint16_t');
export const DWORD = koffi.alias('DWORD', 'uint32_t');
export const VOID = koffi.alias('VOID', 'void');
export const BYTE = koffi.alias('BYTE', 'unsigned char');
export const WCHAR = koffi.alias('WCHAR', 'char16_t');
export const SCARDCONTEXT = koffi.alias('SCARDCONTEXT', 'long *');
export const SCARDHANDLE = koffi.alias('SCARDHANDLE', 'long *');
export const LONG = koffi.alias('LONG', 'long');

export const LPOINT = koffi.struct('LPOINT', {
  x: LONG,
  y: LONG,
});

export const LRECT = koffi.struct('LRECT', {
  left: LONG,
  top: LONG,
  right: LONG,
  bottom: LONG,
});

export const HANDLE = koffi.pointer('HANDLE', koffi.opaque());
export const LPVOID = koffi.pointer('LPVOID', VOID);
export const LPHANDLE = koffi.pointer('LPHANDLE', HANDLE);
export const LPDWORD = koffi.pointer('LPDWORD', DWORD);
export const LPTSTR = koffi.pointer('LPTSTR', WCHAR);
export const LPBYTE = koffi.pointer('LPBYTE', BYTE);
export const LPSCARDHANDLE = koffi.pointer('LPSCARDHANDLE', SCARDCONTEXT);
export const LPSCARDCONTEXT = koffi.pointer('LPSCARDCONTEXT', SCARDHANDLE);
export const LPCVOID = koffi.pointer('LPCVOID', VOID);
export const LPCBYTE = koffi.pointer('LPCBYTE', 'const unsigned char*');
export const LPCWSTR = koffi.pointer('LPCWSTR', WCHAR);
export const LPWSTR = koffi.pointer('LPWSTR', WCHAR);
export const LPPOINT = koffi.pointer('LPPOINT', LPOINT);
export const LPRECT = koffi.pointer('LPRECT', LRECT);
