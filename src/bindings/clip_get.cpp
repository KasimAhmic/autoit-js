#include "../macros.h"
#include "../validators.h"
#include "autoitx3.h"
#include "bindings.h"

Napi::Object ClipGet(const Napi::CallbackInfo &info) {
    const Napi::Env env = info.Env();

    if (const auto [success, error] = ValidateArguments(info, 1, {napi_number}); !success) {
        ReturnResult(false, StatusCode::ValidationError, error);
    }

    const int bufferSize = info[0].As<Napi::Number>().Int32Value();

    const auto [ClipGet, errorCode, error] = LoadAutoItFunction(AU3_ClipGet);

    if (ClipGet == nullptr) {
        ReturnResult(false, errorCode, errorCode)
    }

    std::vector<wchar_t> buffer(bufferSize);

    ClipGet(buffer.data(), bufferSize);

    ReturnResult(true, StatusCode::None, Napi::String::New(env, WCharToString(buffer.data())));
}
