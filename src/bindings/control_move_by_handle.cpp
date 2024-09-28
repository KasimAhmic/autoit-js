#include "../macros.h"
#include "../validators.h"
#include "autoitx3.h"
#include "bindings.h"

Napi::Object ControlMoveByHandle(const Napi::CallbackInfo &info) {
    const Napi::Env env = info.Env();

    // TODO: Handle validation
    if (const auto [success, error] = ValidateArguments(info, 0, {}); !success) {
        ReturnResult(false, StatusCode::ValidationError, error);
    }

    const auto [ControlMoveByHandle, errorCode, error] = LoadAutoItFunction(AU3_ControlMoveByHandle);

    if (ControlMoveByHandle == nullptr) {
        ReturnResult(false, errorCode, error);
    }

    // TODO: Call the function
    // ControlMoveByHandle();

    ReturnResult(true, StatusCode::None, env.Null());
}
