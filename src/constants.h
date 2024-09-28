#ifndef CONSTANTS_H
#define CONSTANTS_H

enum StatusCode {
    ValidationError = -1,
    DllLoadError = -2,
    FunctionLoadError = -3,
    LibraryNotLoadedError = -4,
    CouldNotLoadLibraryError = -5,
    CouldNotUnloadLibraryError = -6,
    None = -2147483647
};

#endif // CONSTANTS_H
