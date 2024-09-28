#ifndef VALIDATORS_H
#define VALIDATORS_H

#include <napi.h>

#include <utility>

struct ValidationResult {
    bool success;
    std::string error;

    explicit ValidationResult(const bool success, std::string error = "") : success(success), error(std::move(error)) {}
};

ValidationResult ValidateArguments(const Napi::CallbackInfo &info, int argumentCount,
                                   const std::vector<napi_valuetype> &argumentTypes);
ValidationResult ValidateNumberInRange(Napi::Env env, int argumentIndex, int value, int min, int max);

#endif // VALIDATORS_H
