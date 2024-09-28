#include "../macros.h"
#include "../validators.h"
#include "autoitx3.h"
#include "bindings.h"

Napi::Object PixelGetColor(const Napi::CallbackInfo &info) {
    const Napi::Env env = info.Env();

    // TODO: Handle validation
    if (const auto [success, error] = ValidateArguments(info, 0, {}); !success) {
        ReturnResult(false, StatusCode::ValidationError, error);
    }

    const auto [PixelGetColor, errorCode, error] = LoadAutoItFunction(AU3_PixelGetColor);

    if (PixelGetColor == nullptr) {
        ReturnResult(false, errorCode, error);
    }

    // TODO: Call the function
    // PixelGetColor();

    ReturnResult(true, StatusCode::None, env.Null());
}
