#include "../macros.h"
#include "../validators.h"
#include "autoitx3.h"
#include "bindings.h"

Napi::Object ProcessClose(const Napi::CallbackInfo &info) {
    const Napi::Env env = info.Env();

    // TODO: Handle validation
    if (const auto [success, error] = ValidateArguments(info, 0, {}); !success) {
        ReturnResult(false, StatusCode::ValidationError, error);
    }

    const auto [ProcessClose, errorCode, error] = LoadAutoItFunction(AU3_ProcessClose);

    if (ProcessClose == nullptr) {
        ReturnResult(false, errorCode, error);
    }

    // TODO: Call the function
    // ProcessClose();

    ReturnResult(true, StatusCode::None, env.Null());
}
