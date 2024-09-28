#include "../macros.h"
#include "../validators.h"
#include "autoitx3.h"
#include "bindings.h"

Napi::Object WinClose(const Napi::CallbackInfo &info) {
    const Napi::Env env = info.Env();

    if (const auto [success, error] = ValidateArguments(info, 2, {napi_string, napi_string}); !success) {
        ReturnResult(false, StatusCode::ValidationError, error);
    }

    const std::u16string windowTitle = info[0].As<Napi::String>().Utf16Value();
    const std::u16string windowText = info[1].As<Napi::String>().Utf16Value();

    const auto *szTitle = reinterpret_cast<const wchar_t *>(windowTitle.c_str());
    const auto *szText = reinterpret_cast<const wchar_t *>(windowText.c_str());

    const auto [WinClose, errorCode, error] = LoadAutoItFunction(AU3_WinClose);

    if (WinClose == nullptr) {
        ReturnResult(false, errorCode, error);
    }

    const int code = WinClose(szTitle, szText);

    ReturnResult(code == 1, code, env.Null());
}
