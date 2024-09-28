#include "../macros.h"
#include "../validators.h"
#include "autoitx3.h"
#include "bindings.h"

Napi::Object WinSetTitle(const Napi::CallbackInfo &info) {
    const Napi::Env env = info.Env();

    if (const auto [success, error] = ValidateArguments(info, 3, {napi_string, napi_string, napi_string}); !success) {
        ReturnResult(false, StatusCode::ValidationError, error);
    }

    const std::u16string windowTitle = info[0].As<Napi::String>().Utf16Value();
    const std::u16string windowText = info[1].As<Napi::String>().Utf16Value();
    const std::u16string newTitle = info[2].As<Napi::String>().Utf16Value();

    const auto *szTitle = reinterpret_cast<const wchar_t *>(windowTitle.c_str());
    const auto *szText = reinterpret_cast<const wchar_t *>(windowText.c_str());
    const auto *szNewTitle = reinterpret_cast<const wchar_t *>(newTitle.c_str());

    const auto [WinSetTitle, errorCode, error] = LoadAutoItFunction(AU3_WinSetTitle);

    if (WinSetTitle == nullptr) {
        ReturnResult(false, errorCode, error);
    }

    const int32_t code = WinSetTitle(szTitle, szText, szNewTitle);

    ReturnResult(code == 1, code, env.Null());
}
