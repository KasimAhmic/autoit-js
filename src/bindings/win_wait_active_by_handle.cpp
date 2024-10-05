#include "../macros.h"
#include "../validators.h"
#include "autoitx3.h"
#include "bindings.h"

Napi::Object WinWaitActiveByHandle(const Napi::CallbackInfo &info) {
    const Napi::Env env = info.Env();

    if (const auto [success, error] = ValidateArguments(info, 2, {napi_number, napi_number}); !success) {
        ReturnResult(false, StatusCode::ValidationError, error);
    }

    const int32_t handle = info[0].As<Napi::Number>().Int32Value();
    const int32_t timeout = info[1].As<Napi::Number>().Int32Value();

    HWND hwnd = IntToHandle(handle);

    const auto [WinWaitActiveByHandle, errorCode, error] = LoadAutoItFunction(AU3_WinWaitActiveByHandle);

    if (WinWaitActiveByHandle == nullptr) {
        ReturnResult(false, errorCode, error);
    }

    const int32_t code = WinWaitActiveByHandle(hwnd, timeout);

    ReturnResult(code == 1, code, env.Null());
}
