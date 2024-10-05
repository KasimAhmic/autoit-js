#include "../macros.h"
#include "../validators.h"
#include "autoitx3.h"
#include "bindings.h"

Napi::Object WinExists(const Napi::CallbackInfo &info) {
    const Napi::Env env = info.Env();

    if (const auto [success, error] = ValidateArguments(info, 2, {napi_string, napi_string}); !success) {
        ReturnResult(false, StatusCode::ValidationError, error);
    }

    const std::u16string title = info[0].As<Napi::String>().Utf16Value();
    const std::u16string text = info[1].As<Napi::String>().Utf16Value();

    const auto *szTitle = reinterpret_cast<const wchar_t *>(title.c_str());
    const auto *szText = reinterpret_cast<const wchar_t *>(text.c_str());

    const auto [WinExists, errorCode, error] = LoadAutoItFunction(AU3_WinExists);

    if (WinExists == nullptr) {
        ReturnResult(false, errorCode, error);
    }

    const int code = WinExists(szTitle, szText);

    ReturnResult(code == 1, code, Napi::Boolean::New(env, code == 1));
}
