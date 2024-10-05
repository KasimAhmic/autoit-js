#include "../macros.h"
#include "../validators.h"
#include "autoitx3.h"
#include "bindings.h"

Napi::Object Run(const Napi::CallbackInfo &info) {
    const Napi::Env env = info.Env();

    if (const auto [success, error] = ValidateArguments(info, 3, {napi_string, napi_string, napi_number}); !success) {
        ReturnResult(false, StatusCode::ValidationError, error);
    }

    const std::u16string programName = info[0].As<Napi::String>().Utf16Value();
    const std::u16string workingDirectory = info[1].As<Napi::String>().Utf16Value();
    const int showFlag = info[2].As<Napi::Number>().Int32Value();

    const auto *szProgramName = reinterpret_cast<const wchar_t *>(programName.c_str());
    const auto *szWorkingDirectory = reinterpret_cast<const wchar_t *>(workingDirectory.c_str());

    const auto [func, errorCode, error] = LoadAutoItFunction(AU3_Run);

    if (Run == nullptr) {
        ReturnResult(false, errorCode, error);
    }

    const int pid = func(szProgramName, szWorkingDirectory, showFlag);

    ReturnResult(pid != 0, StatusCode::None, pid == 0 ? env.Null() : Napi::Number::New(env, pid));
}
