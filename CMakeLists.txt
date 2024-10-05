# This file is mostly here to aid IDE IntelliSense, I don't think CMake can be used to build the project on its own.

cmake_minimum_required(VERSION 3.28)
project(autoit_js)

# Wanna use C++23, but MSVC doesn't support it yet... Microsoft is cringe.
set(CMAKE_CXX_STANDARD 17)

include_directories(${CMAKE_JS_INC} "${CMAKE_CURRENT_SOURCE_DIR}/node_modules/node-api-headers/include")
include_directories(${CMAKE_JS_INC} "${CMAKE_CURRENT_SOURCE_DIR}/node_modules/node-addon-api")

file(GLOB_RECURSE AUTOIT_JS_SRC
        "src/*.cpp"
        "src/*.h"
)

add_library(autoit_js SHARED ${AUTOIT_JS_SRC})
