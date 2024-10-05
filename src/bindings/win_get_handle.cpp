#include "../macros.h"
#include "../validators.h"
#include "autoitx3.h"
#include "bindings.h"

Napi::Object WinGetHandle(const Napi::CallbackInfo &info) {
    const Napi::Env env = info.Env();

    if (const auto [success, error] = ValidateArguments(info, 2, {napi_string, napi_string}); !success) {
        ReturnResult(false, StatusCode::ValidationError, error);
    }

    const std::u16string windowTitle = info[0].As<Napi::String>().Utf16Value();
    const std::u16string windowText = info[1].As<Napi::String>().Utf16Value();

    const auto *szTitle = reinterpret_cast<const wchar_t *>(windowTitle.c_str());
    const auto *szText = reinterpret_cast<const wchar_t *>(windowText.c_str());

    const auto [WinGetHandle, errorCode, error] = LoadAutoItFunction(AU3_WinGetHandle);

    if (WinGetHandle == nullptr) {
        ReturnResult(false, errorCode, error);
    }

    HWND result = WinGetHandle(szTitle, szText);

    const auto windowHandle = HwndToDouble(result);

    ReturnResult(windowHandle != 0, StatusCode::None, Napi::Number::New(env, windowHandle));
}
