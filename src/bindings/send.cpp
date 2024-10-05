#include "../macros.h"
#include "../validators.h"
#include "autoitx3.h"
#include "bindings.h"

Napi::Object Send(const Napi::CallbackInfo &info) {
    const Napi::Env env = info.Env();

    // TODO: Handle validation
    if (const auto [success, error] = ValidateArguments(info, 0, {}); !success) {
        ReturnResult(false, StatusCode::ValidationError, error);
    }

    const auto [Send, errorCode, error] = LoadAutoItFunction(AU3_Send);

    if (Send == nullptr) {
        ReturnResult(false, errorCode, error);
    }

    // TODO: Call the function
    // Send();

    ReturnResult(true, StatusCode::None, env.Null());
}
