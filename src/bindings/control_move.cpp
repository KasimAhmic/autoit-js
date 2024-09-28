#include "../macros.h"
#include "../validators.h"
#include "autoitx3.h"
#include "bindings.h"

Napi::Object ControlMove(const Napi::CallbackInfo &info) {
    const Napi::Env env = info.Env();

    if (const auto [success, error] = ValidateArguments(
                info, 7, {napi_string, napi_string, napi_string, napi_number, napi_number, napi_number, napi_number});
        !success) {
        ReturnResult(false, StatusCode::ValidationError, error);
    }

    const std::u16string title = info[0].As<Napi::String>().Utf16Value();
    const std::u16string text = info[1].As<Napi::String>().Utf16Value();
    const std::u16string control = info[2].As<Napi::String>().Utf16Value();
    const int x = info[3].As<Napi::Number>().Int32Value();
    const int y = info[4].As<Napi::Number>().Int32Value();
    const int width = info[5].As<Napi::Number>().Int32Value();
    const int height = info[6].As<Napi::Number>().Int32Value();

    const auto *szTitle = reinterpret_cast<const wchar_t *>(title.c_str());
    const auto *szText = reinterpret_cast<const wchar_t *>(text.c_str());
    const auto *szControl = reinterpret_cast<const wchar_t *>(control.c_str());

    const auto [ControlMove, errorCode, error] = LoadAutoItFunction(AU3_ControlMove);

    if (ControlMove == nullptr) {
        ReturnResult(false, errorCode, error);
    }

    const int code = ControlMove(szTitle, szText, szControl, x, y, width, height);

    ReturnResult(code == 1, code, env.Null());
}
