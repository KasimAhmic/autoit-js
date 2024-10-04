#include "../macros.h"
#include "../validators.h"
#include "autoitx3.h"
#include "bindings.h"

Napi::Object WinWaitNotActiveByHandle(const Napi::CallbackInfo &info) {
    const Napi::Env env = info.Env();

    if (const auto [success, error] = ValidateArguments(info, 2, {napi_number, napi_number}); !success) {
        ReturnResult(false, StatusCode::ValidationError, error);
    }

    const double handle = info[0].As<Napi::Number>().DoubleValue();
    const int timeout = info[1].As<Napi::Number>().Int32Value();

    const auto hwnd = reinterpret_cast<HWND>(static_cast<uintptr_t>(handle));

    const auto [WinWaitNotActiveByHandle, errorCode, error] = LoadAutoItFunction(AU3_WinWaitNotActiveByHandle);

    if (WinWaitNotActiveByHandle == nullptr) {
        ReturnResult(false, errorCode, error);
    }

    const int code = WinWaitNotActiveByHandle(hwnd, timeout);

    ReturnResult(code == 1, code, env.Null());
}
