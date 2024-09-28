#include "../macros.h"
#include "../validators.h"
#include "autoitx3.h"
#include "bindings.h"

Napi::Object WinGetPos(const Napi::CallbackInfo &info) {
    const Napi::Env env = info.Env();

    if (const auto [success, error] = ValidateArguments(info, 2, {napi_string, napi_string}); !success) {
        ReturnResult(false, StatusCode::ValidationError, error);
    }

    const std::u16string windowTitle = info[0].As<Napi::String>().Utf16Value();
    const std::u16string windowText = info[1].As<Napi::String>().Utf16Value();

    const auto *szTitle = reinterpret_cast<const wchar_t *>(windowTitle.c_str());
    const auto *szText = reinterpret_cast<const wchar_t *>(windowText.c_str());

    const auto [WinGetPos, errorCode, error] = LoadAutoItFunction(AU3_WinGetPos);

    if (WinGetPos == nullptr) {
        ReturnResult(false, errorCode, error);
    }

    RECT rect = {};

    const int code = WinGetPos(szTitle, szText, &rect);

    const Napi::Object result = Napi::Object::New(env);

    result.Set("x", Napi::Number::New(env, rect.left));
    result.Set("y", Napi::Number::New(env, rect.top));
    result.Set("width", Napi::Number::New(env, rect.right));
    result.Set("height", Napi::Number::New(env, rect.bottom));

    ReturnResult(code == 0, code, result);
}
