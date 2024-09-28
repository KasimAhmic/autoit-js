#include "../macros.h"
#include "../validators.h"
#include "autoitx3.h"
#include "bindings.h"

Napi::Object ToolTip(const Napi::CallbackInfo &info) {
    const Napi::Env env = info.Env();

    if (const auto [success, error] = ValidateArguments(info, 3, {napi_string, napi_number, napi_number}); !success) {
        ReturnResult(false, StatusCode::ValidationError, error);
    }

    const std::u16string text = info[0].As<Napi::String>().Utf16Value();
    const int32_t xPosition = info[1].As<Napi::Number>().Int32Value();
    const int32_t yPosition = info[2].As<Napi::Number>().Int32Value();

    const auto *szText = reinterpret_cast<const wchar_t *>(text.c_str());

    const auto [ToolTip, errorCode, error] = LoadAutoItFunction(AU3_ToolTip);

    if (ToolTip == nullptr) {
        ReturnResult(false, errorCode, error);
    }

    ToolTip(szText, xPosition, yPosition);

    ReturnResult(true, StatusCode::None, env.Null());
}
