#include "../macros.h"
#include "../validators.h"
#include "autoitx3.h"
#include "bindings.h"

Napi::Object RunAsWait(const Napi::CallbackInfo &info) {
    const Napi::Env env = info.Env();

    // TODO: Handle validation
    if (const auto [success, error] = ValidateArguments(info, 0, {}); !success) {
        ReturnResult(false, StatusCode::ValidationError, error);
    }

    const auto [RunAsWait, errorCode, error] = LoadAutoItFunction(AU3_RunAsWait);

    if (RunAsWait == nullptr) {
        ReturnResult(false, errorCode, error);
    }

    // TODO: Call the function
    // RunAsWait();

    ReturnResult(true, StatusCode::None, env.Null());
}
