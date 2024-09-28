#ifndef MACROS_H
#define MACROS_H

#include "util.h"

/**
 * @brief Construct a Napi::Object with the given parameters and return it.
 *
 * @param isSuccess [bool] Boolean indicating if the operation was successful.
 * @param code [int] The return code of the operation, usually the AutoIt return code.
 * @param value [Napi::Value] The value to return.
 */
#define ReturnResult(isSuccess, code, value)                                                                           \
    const auto obj = Napi::Object::New(env);                                                                           \
                                                                                                                       \
    obj.Set("isSuccess", Napi::Boolean::New(env, isSuccess));                                                          \
    obj.Set("code", Napi::Number::New(env, code));                                                                     \
    obj.Set("value", value);                                                                                           \
                                                                                                                       \
    return obj;


#define LoadAutoItFunction(func) LoadFunction<func>(AUTO_IT, #func);

#endif // MACROS_H
