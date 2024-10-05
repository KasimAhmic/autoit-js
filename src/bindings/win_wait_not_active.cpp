#include "../macros.h"
#include "../validators.h"
#include "autoitx3.h"
#include "bindings.h"

Napi::Object WinWaitNotActive(const Napi::CallbackInfo &info) {
    const Napi::Env env = info.Env();

    // TODO: Handle validation
    if (const auto [success, error] = ValidateArguments(info, 0, {}); !success) {
        ReturnResult(false, StatusCode::ValidationError, error);
    }

    const auto [WinWaitNotActive, errorCode, error] = LoadAutoItFunction(AU3_WinWaitNotActive);

    if (WinWaitNotActive == nullptr) {
        ReturnResult(false, errorCode, error);
    }

    // TODO: Call the function
    // WinWaitNotActive();

    ReturnResult(true, StatusCode::None, env.Null());
}
