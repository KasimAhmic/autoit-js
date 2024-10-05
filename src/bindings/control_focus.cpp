#include "../macros.h"
#include "../validators.h"
#include "autoitx3.h"
#include "bindings.h"

Napi::Object ControlFocus(const Napi::CallbackInfo &info) {
    const Napi::Env env = info.Env();

    if (const auto [success, error] = ValidateArguments(info, 3, {napi_string, napi_string, napi_string}); !success) {
        ReturnResult(false, StatusCode::ValidationError, error);
    }

    const std::u16string title = info[0].As<Napi::String>().Utf16Value();
    const std::u16string text = info[1].As<Napi::String>().Utf16Value();
    const std::u16string control = info[2].As<Napi::String>().Utf16Value();

    const auto *szTitle = reinterpret_cast<const wchar_t *>(title.c_str());
    const auto *szText = reinterpret_cast<const wchar_t *>(text.c_str());
    const auto *szControl = reinterpret_cast<const wchar_t *>(control.c_str());

    const auto [ControlFocus, errorCode, error] = LoadAutoItFunction(AU3_ControlFocus);

    if (ControlFocus == nullptr) {
        ReturnResult(false, errorCode, error);
    }

    const int code = ControlFocus(szTitle, szText, szControl);

    ReturnResult(code == 1, code, env.Null());
}
