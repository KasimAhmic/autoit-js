#include "../macros.h"
#include "../validators.h"
#include "autoitx3.h"
#include "bindings.h"

Napi::Object ClipPut(const Napi::CallbackInfo &info) {
    const Napi::Env env = info.Env();

    if (const auto [success, error] = ValidateArguments(info, 1, {napi_string}); !success) {
        ReturnResult(false, StatusCode::ValidationError, error);
    }

    const std::u16string text = info[0].As<Napi::String>().Utf16Value();

    const auto *szClip = reinterpret_cast<const wchar_t *>(text.c_str());

    const auto [ClipPut, errorCode, error] = LoadAutoItFunction(AU3_ClipPut);

    if (ClipPut == nullptr) {
        ReturnResult(false, errorCode, error);
    }

    ClipPut(szClip);

    ReturnResult(true, StatusCode::None, env.Null());
}
