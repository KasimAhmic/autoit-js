#ifndef AUTOITX3_H
#define AUTOITX3_H

#include <windows.h>

// clang-format off

typedef void(WINAPI *AU3_Init)();
int AU3_error();

typedef int(WINAPI *AU3_AutoItSetOption)(LPCWSTR szOption, int nValue);

typedef void(WINAPI *AU3_ClipGet)(LPWSTR szClip, int nBufSize);
typedef void(WINAPI *AU3_ClipPut)(LPCWSTR szClip);
typedef int(WINAPI *AU3_ControlClick)(LPCWSTR szTitle, LPCWSTR szText, LPCWSTR szControl, LPCWSTR szButton, int nNumClicks, int nX, int nY);
typedef int(WINAPI *AU3_ControlClickByHandle)(HWND hWnd, HWND hCtrl, LPCWSTR szButton, int nNumClicks, int nX, int nY);
typedef void(WINAPI *AU3_ControlCommand)(LPCWSTR szTitle, LPCWSTR szText, LPCWSTR szControl, LPCWSTR szCommand, LPCWSTR szExtra, LPWSTR szResult, int nBufSize);
typedef void(WINAPI *AU3_ControlCommandByHandle)(HWND hWnd, HWND hCtrl, LPCWSTR szCommand, LPCWSTR szExtra, LPWSTR szResult, int nBufSize);
typedef void(WINAPI *AU3_ControlListView)(LPCWSTR szTitle, LPCWSTR szText, LPCWSTR szControl, LPCWSTR szCommand, LPCWSTR szExtra1, LPCWSTR szExtra2, LPWSTR szResult, int nBufSize);
typedef void(WINAPI *AU3_ControlListViewByHandle)(HWND hWnd, HWND hCtrl, LPCWSTR szCommand, LPCWSTR szExtra1, LPCWSTR szExtra2, LPWSTR szResult, int nBufSize);
typedef int(WINAPI *AU3_ControlDisable)(LPCWSTR szTitle, LPCWSTR szText, LPCWSTR szControl);
typedef int(WINAPI *AU3_ControlDisableByHandle)(HWND hWnd, HWND hCtrl);
typedef int(WINAPI *AU3_ControlEnable)(LPCWSTR szTitle, LPCWSTR szText, LPCWSTR szControl);
typedef int(WINAPI *AU3_ControlEnableByHandle)(HWND hWnd, HWND hCtrl);
typedef int(WINAPI *AU3_ControlFocus)(LPCWSTR szTitle, LPCWSTR szText, LPCWSTR szControl);
typedef int(WINAPI *AU3_ControlFocusByHandle)(HWND hWnd, HWND hCtrl);
typedef void(WINAPI *AU3_ControlGetFocus)(LPCWSTR szTitle, LPCWSTR szText, LPWSTR szControlWithFocus, int nBufSize);
typedef void(WINAPI *AU3_ControlGetFocusByHandle)(HWND hWnd, LPWSTR szControlWithFocus, int nBufSize);
typedef HWND(WINAPI *AU3_ControlGetHandle)(HWND hWnd, LPCWSTR szControl);
typedef void(WINAPI *AU3_ControlGetHandleAsText)(LPCWSTR szTitle, LPCWSTR szText, LPCWSTR szControl, LPWSTR szRetText, int nBufSize);
typedef int(WINAPI *AU3_ControlGetPos)(LPCWSTR szTitle, LPCWSTR szText, LPCWSTR szControl, LPRECT lpRect);
typedef int(WINAPI *AU3_ControlGetPosByHandle)(HWND hWnd, HWND hCtrl, LPRECT lpRect);
typedef void(WINAPI *AU3_ControlGetText)(LPCWSTR szTitle, LPCWSTR szText, LPCWSTR szControl, LPWSTR szControlText, int nBufSize);
typedef void(WINAPI *AU3_ControlGetTextByHandle)(HWND hWnd, HWND hCtrl, LPWSTR szControlText, int nBufSize);
typedef int(WINAPI *AU3_ControlHide)(LPCWSTR szTitle, LPCWSTR szText, LPCWSTR szControl);
typedef int(WINAPI *AU3_ControlHideByHandle)(HWND hWnd, HWND hCtrl);
typedef int(WINAPI *AU3_ControlMove)(LPCWSTR szTitle, LPCWSTR szText, LPCWSTR szControl, int nX, int nY, int nWidth, int nHeight);
typedef int(WINAPI *AU3_ControlMoveByHandle)(HWND hWnd, HWND hCtrl, int nX, int nY, int nWidth, int nHeight);
typedef int(WINAPI *AU3_ControlSend)(LPCWSTR szTitle, LPCWSTR szText, LPCWSTR szControl, LPCWSTR szSendText, int nMode);
typedef int(WINAPI *AU3_ControlSendByHandle)(HWND hWnd, HWND hCtrl, LPCWSTR szSendText, int nMode);
typedef int(WINAPI *AU3_ControlSetText)(LPCWSTR szTitle, LPCWSTR szText, LPCWSTR szControl, LPCWSTR szControlText);
typedef int(WINAPI *AU3_ControlSetTextByHandle)(HWND hWnd, HWND hCtrl, LPCWSTR szControlText);
typedef int(WINAPI *AU3_ControlShow)(LPCWSTR szTitle, LPCWSTR szText, LPCWSTR szControl);
typedef int(WINAPI *AU3_ControlShowByHandle)(HWND hWnd, HWND hCtrl);
typedef void(WINAPI *AU3_ControlTreeView)(LPCWSTR szTitle, LPCWSTR szText, LPCWSTR szControl, LPCWSTR szCommand, LPCWSTR szExtra1, LPCWSTR szExtra2, LPWSTR szResult, int nBufSize);
typedef void(WINAPI *AU3_ControlTreeViewByHandle)(HWND hWnd, HWND hCtrl, LPCWSTR szCommand, LPCWSTR szExtra1, LPCWSTR szExtra2, LPWSTR szResult, int nBufSize);

typedef void(WINAPI *AU3_DriveMapAdd)(LPCWSTR szDevice, LPCWSTR szShare, int nFlags, LPCWSTR szUser, LPCWSTR szPwd, LPWSTR szResult, int nBufSize);
typedef int(WINAPI *AU3_DriveMapDel)(LPCWSTR szDevice);
typedef void(WINAPI *AU3_DriveMapGet)(LPCWSTR szDevice, LPWSTR szMapping, int nBufSize);

typedef int(WINAPI *AU3_IsAdmin)();

typedef int(WINAPI *AU3_MouseClick)(LPCWSTR szButton, int nX, int nY, int nClicks, int nSpeed);
typedef int(WINAPI *AU3_MouseClickDrag)(LPCWSTR szButton, int nX1, int nY1, int nX2, int nY2, int nSpeed);
typedef void(WINAPI *AU3_MouseDown)(LPCWSTR szButton);
typedef int(WINAPI *AU3_MouseGetCursor)();
typedef void(WINAPI *AU3_MouseGetPos)(LPPOINT lpPoint);
typedef int(WINAPI *AU3_MouseMove)(int nX, int nY, int nSpeed);
typedef void(WINAPI *AU3_MouseUp)(LPCWSTR szButton);
typedef void(WINAPI *AU3_MouseWheel)(LPCWSTR szDirection, int nClicks);

typedef int(WINAPI *AU3_Opt)(LPCWSTR szOption, int nValue);

typedef unsigned int(WINAPI *AU3_PixelChecksum)(LPRECT lpRect, int nStep);
typedef int(WINAPI *AU3_PixelGetColor)(int nX, int nY);
typedef void(WINAPI *AU3_PixelSearch)(LPRECT lpRect, int nCol, int nVar, int nStep, LPPOINT pPointResult);
typedef int(WINAPI *AU3_ProcessClose)(LPCWSTR szProcess);
typedef int(WINAPI *AU3_ProcessExists)(LPCWSTR szProcess);
typedef int(WINAPI *AU3_ProcessSetPriority)(LPCWSTR szProcess, int nPriority);
typedef int(WINAPI *AU3_ProcessWait)(LPCWSTR szProcess, int nTimeout);
typedef int(WINAPI *AU3_ProcessWaitClose)(LPCWSTR szProcess, int nTimeout);

typedef int(WINAPI *AU3_Run)(LPCWSTR szProgram, LPCWSTR szDir, int nShowFlag);
typedef int(WINAPI *AU3_RunWait)(LPCWSTR szProgram, LPCWSTR szDir, int nShowFlag);
typedef int(WINAPI *AU3_RunAs)(LPCWSTR szUser, LPCWSTR szDomain, LPCWSTR szPassword, int nLogonFlag, LPCWSTR szProgram, LPCWSTR szDir, int nShowFlag);
typedef int(WINAPI *AU3_RunAsWait)(LPCWSTR szUser, LPCWSTR szDomain, LPCWSTR szPassword, int nLogonFlag, LPCWSTR szProgram, LPCWSTR szDir, int nShowFlag);

typedef void(WINAPI *AU3_Send)(LPCWSTR szSendText, int nMode);
typedef int(WINAPI *AU3_Shutdown)(int nFlags);
typedef void(WINAPI *AU3_Sleep)(int nMilliseconds);
typedef int(WINAPI *AU3_StatusbarGetText)(LPCWSTR szTitle, LPCWSTR szText, int nPart, LPWSTR szStatusText, int nBufSize);
typedef int(WINAPI *AU3_StatusbarGetTextByHandle)(HWND hWnd, int nPart, LPWSTR szStatusText, int nBufSize);

typedef void(WINAPI *AU3_ToolTip)(LPCWSTR szTip, int nX, int nY);

typedef int(WINAPI *AU3_WinActivate)(LPCWSTR szTitle, LPCWSTR szText);
typedef int(WINAPI *AU3_WinActivateByHandle)(HWND hWnd);
typedef int(WINAPI *AU3_WinActive)(LPCWSTR szTitle, LPCWSTR szText);
typedef int(WINAPI *AU3_WinActiveByHandle)(HWND hWnd);
typedef int(WINAPI *AU3_WinClose)(LPCWSTR szTitle, LPCWSTR szText);
typedef int(WINAPI *AU3_WinCloseByHandle)(HWND hWnd);
typedef int(WINAPI *AU3_WinExists)(LPCWSTR szTitle, LPCWSTR szText);
typedef int(WINAPI *AU3_WinExistsByHandle)(HWND hWnd);
typedef int(WINAPI *AU3_WinGetCaretPos)(LPPOINT lpPoint);
typedef void(WINAPI *AU3_WinGetClassList)(LPCWSTR szTitle, LPCWSTR szText, LPWSTR szRetText, int nBufSize);
typedef void(WINAPI *AU3_WinGetClassListByHandle)(HWND hWnd, LPWSTR szRetText, int nBufSize);
typedef int(WINAPI *AU3_WinGetClientSize)(LPCWSTR szTitle, LPCWSTR szText, LPRECT lpRect);
typedef int(WINAPI *AU3_WinGetClientSizeByHandle)(HWND hWnd, LPRECT lpRect);
typedef HWND(WINAPI *AU3_WinGetHandle)(LPCWSTR szTitle, LPCWSTR szText);
typedef void(WINAPI *AU3_WinGetHandleAsText)(LPCWSTR szTitle, LPCWSTR szText, LPWSTR szRetText, int nBufSize);
typedef int(WINAPI *AU3_WinGetPos)(LPCWSTR szTitle, LPCWSTR szText, LPRECT lpRect);
typedef int(WINAPI *AU3_WinGetPosByHandle)(HWND hWnd, LPRECT lpRect);
typedef DWORD(WINAPI *AU3_WinGetProcess)(LPCWSTR szTitle, LPCWSTR szText);
typedef DWORD(WINAPI *AU3_WinGetProcessByHandle)(HWND hWnd);
typedef int(WINAPI *AU3_WinGetState)(LPCWSTR szTitle, LPCWSTR szText);
typedef int(WINAPI *AU3_WinGetStateByHandle)(HWND hWnd);
typedef void(WINAPI *AU3_WinGetText)(LPCWSTR szTitle, LPCWSTR szText, LPWSTR szRetText, int nBufSize);
typedef void(WINAPI *AU3_WinGetTextByHandle)(HWND hWnd, LPWSTR szRetText, int nBufSize);
typedef void(WINAPI *AU3_WinGetTitle)(LPCWSTR szTitle, LPCWSTR szText, LPWSTR szRetText, int nBufSize);
typedef void(WINAPI *AU3_WinGetTitleByHandle)(HWND hWnd, LPWSTR szRetText, int nBufSize);
typedef int(WINAPI *AU3_WinKill)(LPCWSTR szTitle, LPCWSTR szText);
typedef int(WINAPI *AU3_WinKillByHandle)(HWND hWnd);
typedef int(WINAPI *AU3_WinMenuSelectItem)(LPCWSTR szTitle, LPCWSTR szText, LPCWSTR szItem1, LPCWSTR szItem2, LPCWSTR szItem3, LPCWSTR szItem4, LPCWSTR szItem5, LPCWSTR szItem6, LPCWSTR szItem7, LPCWSTR szItem8);
typedef int(WINAPI *AU3_WinMenuSelectItemByHandle)(HWND hWnd, LPCWSTR szItem1, LPCWSTR szItem2, LPCWSTR szItem3, LPCWSTR szItem4, LPCWSTR szItem5, LPCWSTR szItem6, LPCWSTR szItem7, LPCWSTR szItem8);
typedef void(WINAPI *AU3_WinMinimizeAll)();
typedef void(WINAPI *AU3_WinMinimizeAllUndo)();
typedef int(WINAPI *AU3_WinMove)(LPCWSTR szTitle, LPCWSTR szText, int nX, int nY, int nWidth, int nHeight);
typedef int(WINAPI *AU3_WinMoveByHandle)(HWND hWnd, int nX, int nY, int nWidth, int nHeight);
typedef int(WINAPI *AU3_WinSetOnTop)(LPCWSTR szTitle, LPCWSTR szText, int nFlag);
typedef int(WINAPI *AU3_WinSetOnTopByHandle)(HWND hWnd, int nFlag);
typedef int(WINAPI *AU3_WinSetState)(LPCWSTR szTitle, LPCWSTR szText, int nFlags);
typedef int(WINAPI *AU3_WinSetStateByHandle)(HWND hWnd, int nFlags);
typedef int(WINAPI *AU3_WinSetTitle)(LPCWSTR szTitle, LPCWSTR szText, LPCWSTR szNewTitle);
typedef int(WINAPI *AU3_WinSetTitleByHandle)(HWND hWnd, LPCWSTR szNewTitle);
typedef int(WINAPI *AU3_WinSetTrans)(LPCWSTR szTitle, LPCWSTR szText, int nTrans);
typedef int(WINAPI *AU3_WinSetTransByHandle)(HWND hWnd, int nTrans);
typedef int(WINAPI *AU3_WinWait)(LPCWSTR szTitle, LPCWSTR szText, int nTimeout);
typedef int(WINAPI *AU3_WinWaitByHandle)(HWND hWnd, int nTimeout);
typedef int(WINAPI *AU3_WinWaitActive)(LPCWSTR szTitle, LPCWSTR szText, int nTimeout);
typedef int(WINAPI *AU3_WinWaitActiveByHandle)(HWND hWnd, int nTimeout);
typedef int(WINAPI *AU3_WinWaitClose)(LPCWSTR szTitle, LPCWSTR szText, int nTimeout);
typedef int(WINAPI *AU3_WinWaitCloseByHandle)(HWND hWnd, int nTimeout);
typedef int(WINAPI *AU3_WinWaitNotActive)(LPCWSTR szTitle, LPCWSTR szText, int nTimeout);
typedef int(WINAPI *AU3_WinWaitNotActiveByHandle)(HWND hWnd, int nTimeout);

// clang-format on

#endif // AUTOITX3_H
