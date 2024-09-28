#include "../macros.h"
#include "../validators.h"
#include "autoitx3.h"
#include "bindings.h"

Napi::Object WinExistsByHandle(const Napi::CallbackInfo &info) {
    const Napi::Env env = info.Env();

    if (const auto [success, error] = ValidateArguments(info, 1, {napi_number}); !success) {
        ReturnResult(false, StatusCode::ValidationError, error);
    }

    const int handle = info[0].As<Napi::Number>().Int32Value();

    HWND hwnd = IntToHandle(handle);

    const auto [WinExistsByHandle, errorCode, error] = LoadAutoItFunction(AU3_WinExistsByHandle);

    if (WinExistsByHandle == nullptr) {
        ReturnResult(false, errorCode, error);
    }

    const int code = WinExistsByHandle(hwnd);

    ReturnResult(true, code, Napi::Boolean::New(env, code == 1));
}
