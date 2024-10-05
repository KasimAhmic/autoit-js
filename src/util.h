#ifndef UTIL_H
#define UTIL_H

#include <napi.h>
#include <windows.h>

#include <utility>

#include "constants.h"

bool IsLibLoaded(HMODULE library);

std::string WCharToString(const wchar_t *wchar);

double HwndToDouble(HWND hwnd);
HWND IntToHandle(int value);
const wchar_t *Utf16ToWideChar(const std::u16string &string);

template<typename Func>
struct LoadResult {
    Func func;
    int code;
    std::string error;

    LoadResult(Func func, const int code, std::string error = "") : func(func), code(code), error(std::move(error)) {}
};

template<typename Func>
LoadResult<Func> LoadFunction(const HMODULE library, const char *const functionName) {
    if (!IsLibLoaded(library)) {
        return LoadResult<Func>(nullptr, LibraryNotLoadedError,
                                "You must call .Load() before executing AutoIt functions");
    }

    Func func = reinterpret_cast<Func>(GetProcAddress(library, functionName));

    if (func == nullptr) {
        return LoadResult<Func>(nullptr, FunctionLoadError, std::string("Failed to find ") + functionName + " in DLL.");
    }

    return LoadResult<Func>(func, 0, "");
}

#endif // UTIL_H
