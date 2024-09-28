#include "../macros.h"
#include "../validators.h"
#include "autoitx3.h"
#include "bindings.h"

Napi::Object WinCloseByHandle(const Napi::CallbackInfo &info) {
    const Napi::Env env = info.Env();

    if (const auto [success, error] = ValidateArguments(info, 1, {napi_number}); !success) {
        ReturnResult(false, StatusCode::ValidationError, error);
    }

    const double handle = info[0].As<Napi::Number>().DoubleValue();

    const auto hwnd = reinterpret_cast<HWND>(static_cast<uintptr_t>(handle));

    const auto [WinCloseByHandle, errorCode, error] = LoadAutoItFunction(AU3_WinCloseByHandle);

    if (WinCloseByHandle == nullptr) {
        ReturnResult(false, errorCode, error);
    }

    const int code = WinCloseByHandle(hwnd);

    ReturnResult(code == 1, code, env.Null());
}
