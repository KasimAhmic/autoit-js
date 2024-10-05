#include "../constants.h"
#include "../macros.h"
#include "../validators.h"
#include "autoitx3.h"
#include "bindings.h"

Napi::Object AutoItSetOption(const Napi::CallbackInfo &info) {
    const Napi::Env env = info.Env();

    if (const auto [success, error] = ValidateArguments(info, 2, {napi_string, napi_number}); !success) {
        ReturnResult(false, StatusCode::ValidationError, error);
    }

    const std::u16string option = info[0].As<Napi::String>().Utf16Value();
    const int32_t value = info[1].As<Napi::Number>().Int32Value();

    const auto *szOption = reinterpret_cast<const wchar_t *>(option.c_str());

    const auto [AutoItSetOption, errorCode, error] = LoadAutoItFunction(AU3_AutoItSetOption);

    if (AutoItSetOption == nullptr) {
        ReturnResult(false, errorCode, error);
    }

    const int result = AutoItSetOption(szOption, value);

    ReturnResult(result == 1, result, Napi::Number::New(env, result));
}
