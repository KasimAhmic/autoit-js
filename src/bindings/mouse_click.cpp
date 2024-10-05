#include "../macros.h"
#include "../validators.h"
#include "autoitx3.h"
#include "bindings.h"

Napi::Object MouseClick(const Napi::CallbackInfo &info) {
    const Napi::Env env = info.Env();

    // TODO: Handle validation
    if (const auto [success, error] = ValidateArguments(info, 0, {}); !success) {
        ReturnResult(false, StatusCode::ValidationError, error);
    }

    const auto [MouseClick, errorCode, error] = LoadAutoItFunction(AU3_MouseClick);

    if (MouseClick == nullptr) {
        ReturnResult(false, errorCode, error);
    }

    // TODO: Call the function
    // MouseClick();

    ReturnResult(true, StatusCode::None, env.Null());
}
