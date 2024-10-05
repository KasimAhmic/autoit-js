#include "../macros.h"
#include "../validators.h"
#include "autoitx3.h"
#include "bindings.h"

Napi::Object WinKill(const Napi::CallbackInfo &info) {
    const Napi::Env env = info.Env();

    // TODO: Handle validation
    if (const auto [success, error] = ValidateArguments(info, 0, {}); !success) {
        ReturnResult(false, StatusCode::ValidationError, error);
    }

    const auto [WinKill, errorCode, error] = LoadAutoItFunction(AU3_WinKill);

    if (WinKill == nullptr) {
        ReturnResult(false, errorCode, error);
    }

    // TODO: Call the function
    // WinKill();

    ReturnResult(true, StatusCode::None, env.Null());
}
