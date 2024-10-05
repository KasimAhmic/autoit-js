#include "../macros.h"
#include "../validators.h"
#include "autoitx3.h"
#include "bindings.h"

Napi::Object AutoItInit(const Napi::CallbackInfo &info) {
    const Napi::Env env = info.Env();

    const auto [Init, errorCode, error] = LoadAutoItFunction(AU3_Init);

    if (Init == nullptr) {
        ReturnResult(false, errorCode, error);
    }

    Init();

    ReturnResult(true, StatusCode::None, env.Null());
}
