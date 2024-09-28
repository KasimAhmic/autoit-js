#include "../macros.h"
#include "../validators.h"
#include "autoitx3.h"
#include "bindings.h"

Napi::Object WinMinimizeAllUndo(const Napi::CallbackInfo &info) {
    const Napi::Env env = info.Env();

    if (const auto [success, error] = ValidateArguments(info, 0, {}); !success) {
        ReturnResult(false, StatusCode::ValidationError, error);
    }

    const auto [WinMinimizeAllUndo, errorCode, error] = LoadAutoItFunction(AU3_WinMinimizeAllUndo);

    if (WinMinimizeAllUndo == nullptr) {
        ReturnResult(false, errorCode, error);
    }

    WinMinimizeAllUndo();

    ReturnResult(true, StatusCode::None, env.Null());
}
