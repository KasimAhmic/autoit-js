#include "../macros.h"
#include "../validators.h"
#include "autoitx3.h"
#include "bindings.h"

Napi::Object ControlSetTextByHandle(const Napi::CallbackInfo &info) {
    const Napi::Env env = info.Env();

    // TODO: Handle validation
    if (const auto [success, error] = ValidateArguments(info, 0, {}); !success) {
        ReturnResult(false, StatusCode::ValidationError, error);
    }

    const auto [ControlSetTextByHandle, errorCode, error] = LoadAutoItFunction(AU3_ControlSetTextByHandle);

    if (ControlSetTextByHandle == nullptr) {
        ReturnResult(false, errorCode, error);
    }

    // TODO: Call the function
    // ControlSetTextByHandle();

    ReturnResult(true, StatusCode::None, env.Null());
}
