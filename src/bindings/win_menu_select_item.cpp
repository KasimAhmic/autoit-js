#include "../macros.h"
#include "../validators.h"
#include "autoitx3.h"
#include "bindings.h"

Napi::Object WinMenuSelectItem(const Napi::CallbackInfo &info) {
    const Napi::Env env = info.Env();

    if (const auto [success, error] = ValidateArguments(info, 10, {
                                                            napi_string, napi_string, napi_string, napi_string,
                                                            napi_string, napi_string, napi_string, napi_string,
                                                            napi_string, napi_string
                                                        }); !success) {
        ReturnResult(false, StatusCode::ValidationError, error);
    }

    const std::u16string title = info[0].As<Napi::String>().Utf16Value();
    const std::u16string text = info[1].As<Napi::String>().Utf16Value();
    const std::u16string item1 = info[2].As<Napi::String>().Utf16Value();
    const std::u16string item2 = info[3].As<Napi::String>().Utf16Value();
    const std::u16string item3 = info[4].As<Napi::String>().Utf16Value();
    const std::u16string item4 = info[5].As<Napi::String>().Utf16Value();
    const std::u16string item5 = info[6].As<Napi::String>().Utf16Value();
    const std::u16string item6 = info[7].As<Napi::String>().Utf16Value();
    const std::u16string item7 = info[8].As<Napi::String>().Utf16Value();
    const std::u16string item8 = info[9].As<Napi::String>().Utf16Value();

    const auto *szTitle = reinterpret_cast<const wchar_t *>(title.c_str());
    const auto *szText = reinterpret_cast<const wchar_t *>(text.c_str());
    const auto *szItem1 = reinterpret_cast<const wchar_t *>(item1.c_str());
    const auto *szItem2 = reinterpret_cast<const wchar_t *>(item2.c_str());
    const auto *szItem3 = reinterpret_cast<const wchar_t *>(item3.c_str());
    const auto *szItem4 = reinterpret_cast<const wchar_t *>(item4.c_str());
    const auto *szItem5 = reinterpret_cast<const wchar_t *>(item5.c_str());
    const auto *szItem6 = reinterpret_cast<const wchar_t *>(item6.c_str());
    const auto *szItem7 = reinterpret_cast<const wchar_t *>(item7.c_str());
    const auto *szItem8 = reinterpret_cast<const wchar_t *>(item8.c_str());

    const auto [WinMenuSelectItem, errorCode, error] = LoadAutoItFunction(AU3_WinMenuSelectItem);

    if (WinMenuSelectItem == nullptr) {
        ReturnResult(false, errorCode, error);
    }

    const int code = WinMenuSelectItem(szTitle,
                                       szText,
                                       szItem1,
                                       szItem2,
                                       szItem3,
                                       szItem4,
                                       szItem5,
                                       szItem6,
                                       szItem7,
                                       szItem8);

    ReturnResult(code == 1, code, env.Null());
}
