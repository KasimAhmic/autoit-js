#include "validators.h"

#include <cassert>
#include <map>

// Map napi_valuetype to string
const std::map<napi_valuetype, std::string> ArgumentType = {
        {napi_undefined, "undefined"}, {napi_null, "null"},     {napi_boolean, "boolean"}, {napi_number, "number"},
        {napi_string, "string"},       {napi_symbol, "symbol"}, {napi_object, "object"},   {napi_function, "function"},
        {napi_external, "external"},   {napi_bigint, "bigint"}};


/**
 * Validate the number of arguments and their types. Will throw a JavaScript exception if the arguments are invalid.
 *
 * @param info Reference to the N-API callback info
 * @param argumentCount Number of expected arguments
 * @param argumentTypes Expected types of arguments
 *
 * @return bool True if arguments are valid, false otherwise
 */
ValidationResult ValidateArguments(const Napi::CallbackInfo &info, const int argumentCount,
                                   const std::vector<napi_valuetype> &argumentTypes) {
    if (argumentCount != argumentTypes.size()) {
        auto error = std::string("Expected ");
        error += std::to_string(argumentTypes.size());
        error += " argument types, got ";
        error += std::to_string(argumentCount);

        return ValidationResult(false, error);
    }

    if (info.Length() != argumentCount) {
        auto error = std::string("Expected ");
        error += std::to_string(argumentCount);
        error += " arguments, got ";
        error += std::to_string(info.Length());

        return ValidationResult(false, error);
    }

    for (int i = 0; i < argumentCount; ++i) {
        if (info[i].Type() != argumentTypes[i]) {
            auto error = std::string("Argument at index ");
            error += std::to_string(i);
            error += " is of type ";
            error += ArgumentType.at(info[i].Type());
            error += ", expected ";
            error += ArgumentType.at(argumentTypes[i]);

            return ValidationResult(false, error);
        }
    }

    return ValidationResult(true);
}

/**
 * Validate that a number is within a specified range. Will throw a JavaScript exception if the number is out of range.
 *
 * @param env Reference to the N-API environment
 * @param argumentIndex Index of the argument
 * @param value Number to validate
 * @param min Minimum value
 * @param max Maximum value
 *
 * @return bool True if the number is within the specified range, false otherwise
 */
ValidationResult ValidateNumberInRange(const Napi::Env env, const int argumentIndex, const int value, const int min,
                                       const int max) {
    if (value < min || value > max) {
        auto error = std::string("Argument at index ");
        error += std::to_string(argumentIndex);
        error += " is out of range. Must be between ";
        error += std::to_string(min);
        error += " and ";
        error += std::to_string(max);

        return ValidationResult(false, error);
    }

    return ValidationResult(true);
}
