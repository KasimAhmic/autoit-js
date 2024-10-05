#include "bindings/bindings.h"
#include "macros.h"
#include "util.h"

#define ExportFunction(func) exports.Set(Napi::String::New(env, #func), Napi::Function::New(env, func, #func));

HMODULE AUTO_IT = nullptr;

Napi::Object Load(const Napi::CallbackInfo &info) {
    const Napi::Env env = info.Env();

    // TODO: Figure out how to get this path dynamically
    AUTO_IT = LoadLibrary("./build/Release/AutoItX3_x64.dll");

    if (AUTO_IT == nullptr) {
        Napi::Error::New(env, "Failed to load AutoItX3_x64.dll").ThrowAsJavaScriptException();

        ReturnResult(false, StatusCode::CouldNotLoadLibraryError, Napi::Boolean::New(env, false))
    }

    ReturnResult(true, StatusCode::None, Napi::Boolean::New(env, true))
}

Napi::Object IsLoaded(const Napi::CallbackInfo &info) {
    const Napi::Env env = info.Env();

    const bool isLoaded = IsLibLoaded(AUTO_IT);

    ReturnResult(isLoaded, StatusCode::None, Napi::Boolean::New(env, isLoaded));
}

Napi::Object Unload(const Napi::CallbackInfo &info) {
    const Napi::Env env = info.Env();

    if (IsLibLoaded(AUTO_IT)) {
        FreeLibrary(AUTO_IT);

        AUTO_IT = nullptr;

        ReturnResult(true, StatusCode::None, Napi::Boolean::New(env, true));
    }

    ReturnResult(false, StatusCode::CouldNotUnloadLibraryError, Napi::Boolean::New(env, false));
}

Napi::Object Init(const Napi::Env env, const Napi::Object exports) {
    ExportFunction(Load);
    ExportFunction(IsLoaded);
    ExportFunction(Unload);

    // Init and Sleep are exported manually because those names are already used.

    exports.Set(Napi::String::New(env, "Init"), Napi::Function::New(env, AutoItInit, "Init"));
    ExportFunction(AutoItSetOption);
    ExportFunction(ClipGet);
    ExportFunction(ClipPut);
    ExportFunction(ControlClick);
    ExportFunction(ControlClickByHandle);
    ExportFunction(ControlCommand);
    ExportFunction(ControlCommandByHandle);
    ExportFunction(ControlListView);
    ExportFunction(ControlListViewByHandle);
    ExportFunction(ControlDisable);
    ExportFunction(ControlDisableByHandle);
    ExportFunction(ControlEnable);
    ExportFunction(ControlEnableByHandle);
    ExportFunction(ControlFocus);
    ExportFunction(ControlFocusByHandle);
    ExportFunction(ControlGetFocus);
    ExportFunction(ControlGetFocusByHandle);
    ExportFunction(ControlGetHandle);
    ExportFunction(ControlGetHandleAsText);
    ExportFunction(ControlGetPos);
    ExportFunction(ControlGetPosByHandle);
    ExportFunction(ControlGetText);
    ExportFunction(ControlGetTextByHandle);
    ExportFunction(ControlHide);
    ExportFunction(ControlHideByHandle);
    ExportFunction(ControlMove);
    ExportFunction(ControlMoveByHandle);
    ExportFunction(ControlSend);
    ExportFunction(ControlSendByHandle);
    ExportFunction(ControlSetText);
    ExportFunction(ControlSetTextByHandle);
    ExportFunction(ControlShow);
    ExportFunction(ControlShowByHandle);
    ExportFunction(ControlTreeView);
    ExportFunction(ControlTreeViewByHandle);
    ExportFunction(DriveMapAdd);
    ExportFunction(DriveMapDel);
    ExportFunction(DriveMapGet);
    ExportFunction(IsAdmin);
    ExportFunction(MouseClick);
    ExportFunction(MouseClickDrag);
    ExportFunction(MouseDown);
    ExportFunction(MouseGetCursor);
    ExportFunction(MouseGetPos);
    ExportFunction(MouseMove);
    ExportFunction(MouseUp);
    ExportFunction(MouseWheel);
    ExportFunction(Opt);
    ExportFunction(PixelChecksum);
    ExportFunction(PixelGetColor);
    ExportFunction(PixelSearch);
    ExportFunction(ProcessClose);
    ExportFunction(ProcessExists);
    ExportFunction(ProcessSetPriority);
    ExportFunction(ProcessWait);
    ExportFunction(ProcessWaitClose);
    ExportFunction(Run);
    ExportFunction(RunWait);
    ExportFunction(RunAs);
    ExportFunction(RunAsWait);
    ExportFunction(Send);
    ExportFunction(Shutdown);
    exports.Set(Napi::String::New(env, "Sleep"), Napi::Function::New(env, AutoItSleep, "Sleep"));
    ExportFunction(StatusbarGetText);
    ExportFunction(StatusbarGetTextByHandle);
    ExportFunction(ToolTip);
    ExportFunction(WinActivate);
    ExportFunction(WinActivateByHandle);
    ExportFunction(WinActive);
    ExportFunction(WinActiveByHandle);
    ExportFunction(WinClose);
    ExportFunction(WinCloseByHandle);
    ExportFunction(WinExists);
    ExportFunction(WinExistsByHandle);
    ExportFunction(WinGetCaretPos);
    ExportFunction(WinGetClassList);
    ExportFunction(WinGetClassListByHandle);
    ExportFunction(WinGetClientSize);
    ExportFunction(WinGetClientSizeByHandle);
    ExportFunction(WinGetHandle);
    ExportFunction(WinGetHandleAsText);
    ExportFunction(WinGetPos);
    ExportFunction(WinGetPosByHandle);
    ExportFunction(WinGetProcess);
    ExportFunction(WinGetProcessByHandle);
    ExportFunction(WinGetState);
    ExportFunction(WinGetStateByHandle);
    ExportFunction(WinGetText);
    ExportFunction(WinGetTextByHandle);
    ExportFunction(WinGetTitle);
    ExportFunction(WinGetTitleByHandle);
    ExportFunction(WinKill);
    ExportFunction(WinKillByHandle);
    ExportFunction(WinMenuSelectItem);
    ExportFunction(WinMenuSelectItemByHandle);
    ExportFunction(WinMinimizeAll);
    ExportFunction(WinMinimizeAllUndo);
    ExportFunction(WinMove);
    ExportFunction(WinMoveByHandle);
    ExportFunction(WinSetOnTop);
    ExportFunction(WinSetOnTopByHandle);
    ExportFunction(WinSetState);
    ExportFunction(WinSetStateByHandle);
    ExportFunction(WinSetTitle);
    ExportFunction(WinSetTitleByHandle);
    ExportFunction(WinSetTrans);
    ExportFunction(WinSetTransByHandle);
    ExportFunction(WinWait);
    ExportFunction(WinWaitByHandle);
    ExportFunction(WinWaitActive);
    ExportFunction(WinWaitActiveByHandle);
    ExportFunction(WinWaitClose);
    ExportFunction(WinWaitCloseByHandle);
    ExportFunction(WinWaitNotActive);
    ExportFunction(WinWaitNotActiveByHandle);

    return exports;
}

NODE_API_MODULE(autoit_js, Init);
