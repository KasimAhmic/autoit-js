#include "../macros.h"
#include "../validators.h"
#include "autoitx3.h"
#include "bindings.h"

Napi::Object WinSetTransByHandle(const Napi::CallbackInfo &info) {
    const Napi::Env env = info.Env();

    if (const auto [success, error] = ValidateArguments(info, 2, {napi_number, napi_number}); !success) {
        ReturnResult(false, StatusCode::ValidationError, error);
    }

    const int handle = info[0].As<Napi::Number>().Int32Value();
    const int opacity = info[1].As<Napi::Number>().Int32Value();

    if (const auto [success, error] = ValidateNumberInRange(env, 1, opacity, 0, 255); !success) {
        ReturnResult(false, StatusCode::ValidationError, error);
    }

    HWND hwnd = IntToHandle(handle);

    const auto [WinSetTransByHandle, errorCode, error] = LoadAutoItFunction(AU3_WinSetTransByHandle);

    if (WinSetTransByHandle == nullptr) {
        ReturnResult(false, errorCode, error);
    }

    const int code = WinSetTransByHandle(hwnd, opacity);

    ReturnResult(code == 1, code, env.Null());
}
