#include "../macros.h"
#include "../validators.h"
#include "autoitx3.h"
#include "bindings.h"

Napi::Object WinActiveByHandle(const Napi::CallbackInfo &info) {
    const Napi::Env env = info.Env();

    if (const auto [success, error] = ValidateArguments(info, 1, {napi_number}); !success) {
        ReturnResult(false, StatusCode::ValidationError, error);
    }

    const int handle = info[0].As<Napi::Number>().Int32Value();

    HWND hwnd = IntToHandle(handle);

    const auto [WinActiveByHandle, errorCode, error] = LoadAutoItFunction(AU3_WinActiveByHandle);

    if (WinActiveByHandle == nullptr) {
        ReturnResult(false, errorCode, error);
    }

    const int code = WinActiveByHandle(hwnd);

    ReturnResult(code == 1, code, Napi::Number::New(env, code));
}
