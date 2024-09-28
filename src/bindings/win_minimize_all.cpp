#include "../macros.h"
#include "../validators.h"
#include "autoitx3.h"
#include "bindings.h"

Napi::Object WinMinimizeAll(const Napi::CallbackInfo &info) {
    const Napi::Env env = info.Env();

    if (const auto [success, error] = ValidateArguments(info, 0, {}); !success) {
        ReturnResult(false, StatusCode::ValidationError, error);
    }

    const auto [WinMinimizeAll, errorCode, error] = LoadAutoItFunction(AU3_WinMinimizeAll);

    if (WinMinimizeAll == nullptr) {
        ReturnResult(false, errorCode, error);
    }

    WinMinimizeAll();

    ReturnResult(true, StatusCode::None, env.Null());
}
