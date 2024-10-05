#include "../macros.h"
#include "../validators.h"
#include "autoitx3.h"
#include "bindings.h"

Napi::Object ProcessSetPriority(const Napi::CallbackInfo &info) {
    const Napi::Env env = info.Env();

    // TODO: Handle validation
    if (const auto [success, error] = ValidateArguments(info, 0, {}); !success) {
        ReturnResult(false, StatusCode::ValidationError, error);
    }

    const auto [ProcessSetPriority, errorCode, error] = LoadAutoItFunction(AU3_ProcessSetPriority);

    if (ProcessSetPriority == nullptr) {
        ReturnResult(false, errorCode, error);
    }

    // TODO: Call the function
    // ProcessSetPriority();

    ReturnResult(true, StatusCode::None, env.Null());
}
