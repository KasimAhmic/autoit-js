#include "../constants.h"
#include "../macros.h"
#include "../validators.h"
#include "autoitx3.h"
#include "bindings.h"

Napi::Object ControlGetPos(const Napi::CallbackInfo &info) {
    const Napi::Env env = info.Env();

    if (const auto [success, error] = ValidateArguments(info, 3, {napi_string, napi_string, napi_string}); !success) {
        ReturnResult(false, StatusCode::ValidationError, error);
    }

    const std::u16string windowTitle = info[0].As<Napi::String>().Utf16Value();
    const std::u16string windowText = info[1].As<Napi::String>().Utf16Value();
    const std::u16string control = info[2].As<Napi::String>().Utf16Value();

    const auto *szTitle = reinterpret_cast<const wchar_t *>(windowTitle.c_str());
    const auto *szText = reinterpret_cast<const wchar_t *>(windowText.c_str());
    const auto *szControl = reinterpret_cast<const wchar_t *>(control.c_str());

    const auto [ControlGetPos, errorCode, error] = LoadAutoItFunction(AU3_ControlGetPos);

    if (ControlGetPos == nullptr) {
        ReturnResult(false, errorCode, error);
    }

    RECT rect = {};

    const int code = ControlGetPos(szTitle, szText, szControl, &rect);

    const Napi::Object result = Napi::Object::New(env);

    result.Set("x", Napi::Number::New(env, rect.left));
    result.Set("y", Napi::Number::New(env, rect.top));
    result.Set("width", Napi::Number::New(env, rect.right));
    result.Set("height", Napi::Number::New(env, rect.bottom));

    ReturnResult(code == 0, code, result);
}
