#include "../macros.h"
#include "../validators.h"
#include "autoitx3.h"
#include "bindings.h"

Napi::Object WinSetTitleByHandle(const Napi::CallbackInfo &info) {
    const Napi::Env env = info.Env();

    if (const auto [success, error] = ValidateArguments(info, 2, {napi_number, napi_string}); !success) {
        ReturnResult(false, StatusCode::ValidationError, error);
    }

    const double handle = info[0].As<Napi::Number>().DoubleValue();
    const std::u16string title = info[1].As<Napi::String>().Utf16Value();

    const auto hwnd = reinterpret_cast<HWND>(static_cast<uintptr_t>(handle));
    const auto *szTitle = reinterpret_cast<const wchar_t *>(title.c_str());

    const auto [WinSetTitleByHandle, errorCode, error] = LoadAutoItFunction(AU3_WinSetTitleByHandle);

    if (WinSetTitleByHandle == nullptr) {
        ReturnResult(false, errorCode, error);
    }

    const int code = WinSetTitleByHandle(hwnd, szTitle);

    ReturnResult(code == 1, code, env.Null());
}
