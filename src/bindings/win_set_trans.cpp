#include "../macros.h"
#include "../validators.h"
#include "autoitx3.h"
#include "bindings.h"

Napi::Object WinSetTrans(const Napi::CallbackInfo &info) {
    const Napi::Env env = info.Env();

    if (const auto [success, error] = ValidateArguments(info, 3, {napi_string, napi_string, napi_number}); !success) {
        ReturnResult(false, StatusCode::ValidationError, error);
    }

    const std::u16string title = info[0].As<Napi::String>().Utf16Value();
    const std::u16string text = info[1].As<Napi::String>().Utf16Value();
    const int opacity = info[2].As<Napi::Number>().Int32Value();

    const auto *szTitle = reinterpret_cast<const wchar_t *>(title.c_str());
    const auto *szText = reinterpret_cast<const wchar_t *>(text.c_str());

    const auto [WinSetTrans, errorCode, error] = LoadAutoItFunction(AU3_WinSetTrans);

    if (WinSetTrans == nullptr) {
        ReturnResult(false, errorCode, error);
    }

    const int code = WinSetTrans(szTitle, szText, opacity);

    ReturnResult(code != 0, code, env.Null());
}
