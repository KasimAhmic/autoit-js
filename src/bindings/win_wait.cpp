#include "../macros.h"
#include "../validators.h"
#include "autoitx3.h"
#include "bindings.h"

Napi::Object WinWait(const Napi::CallbackInfo &info) {
    const Napi::Env env = info.Env();

    if (const auto [success, error] = ValidateArguments(info, 3, {napi_string, napi_string, napi_number}); !success) {
        ReturnResult(false, StatusCode::ValidationError, error);
    }

    const std::u16string windowTitle = info[0].As<Napi::String>().Utf16Value();
    const std::u16string windowText = info[1].As<Napi::String>().Utf16Value();
    const int timeout = info[2].As<Napi::Number>().Int32Value();

    const auto *szTitle = reinterpret_cast<const wchar_t *>(windowTitle.c_str());
    const auto *szText = reinterpret_cast<const wchar_t *>(windowText.c_str());

    const auto [WinWait, errorCode, error] = LoadAutoItFunction(AU3_WinWait);

    if (WinWait == nullptr) {
        ReturnResult(false, errorCode, error);
    }

    const int code = WinWait(szTitle, szText, timeout);

    ReturnResult(code == 1, code, env.Null());
}
