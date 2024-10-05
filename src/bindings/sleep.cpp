#include "../macros.h"
#include "../validators.h"
#include "autoitx3.h"
#include "bindings.h"

Napi::Object AutoItSleep(const Napi::CallbackInfo &info) {
    const Napi::Env env = info.Env();

    if (const auto [success, error] = ValidateArguments(info, 1, {napi_number}); !success) {
        ReturnResult(false, StatusCode::ValidationError, error);
    }

    const int timeout = info[0].As<Napi::Number>().Int32Value();

    const auto [Sleep, errorCode, error] = LoadAutoItFunction(AU3_Sleep);

    if (Sleep == nullptr) {
        ReturnResult(false, errorCode, error);
    }

    Sleep(timeout);

    ReturnResult(true, StatusCode::None, env.Null());
}
