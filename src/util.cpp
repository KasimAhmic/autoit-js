#include "util.h"

bool IsLibLoaded(HMODULE library) { return library != nullptr; }

std::string WCharToString(const wchar_t *wchar) {
    const int bufferSize = WideCharToMultiByte(CP_UTF8, 0, wchar, -1, nullptr, 0, nullptr, nullptr);

    std::string string(bufferSize, 0);

    WideCharToMultiByte(CP_UTF8, 0, wchar, -1, &string[0], bufferSize, nullptr, nullptr);

    return string;
}

double HwndToDouble(HWND hwnd) { return static_cast<double>(reinterpret_cast<uintptr_t>(hwnd)); }

HWND IntToHandle(const int value) { return reinterpret_cast<HWND>(static_cast<uintptr_t>(value)); }
