#include "../macros.h"
#include "../validators.h"
#include "autoitx3.h"
#include "bindings.h"

Napi::Object WinGetText(const Napi::CallbackInfo &info) {
    const Napi::Env env = info.Env();

    if (const auto [success, error] = ValidateArguments(info, 3, {napi_string, napi_string, napi_number}); !success) {
        ReturnResult(false, StatusCode::ValidationError, error);
    }

    const std::u16string windowTitle = info[0].As<Napi::String>().Utf16Value();
    const std::u16string windowText = info[1].As<Napi::String>().Utf16Value();
    const int bufferSize = info[2].As<Napi::Number>().Int32Value();

    if (const auto [success, error] = ValidateNumberInRange(env, 2, bufferSize, 0, 65535); !success) {
        ReturnResult(false, StatusCode::ValidationError, error);
    }

    const auto *szTitle = reinterpret_cast<const wchar_t *>(windowTitle.c_str());
    const auto *szText = reinterpret_cast<const wchar_t *>(windowText.c_str());

    const auto [WinGetText, errorCode, error] = LoadAutoItFunction(AU3_WinGetText);

    if (WinGetText == nullptr) {
        ReturnResult(false, errorCode, error);
    }

    std::vector<wchar_t> buffer(bufferSize);

    WinGetText(szTitle, szText, buffer.data(), bufferSize);

    const std::string text = WCharToString(buffer.data());

    ReturnResult(!text.empty(), StatusCode::None, Napi::String::New(env, text));
}
