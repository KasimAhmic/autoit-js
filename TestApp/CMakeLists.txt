cmake_minimum_required(VERSION 3.28)

project(TestApp)
enable_language(RC)

set(CMAKE_CXX_STANDARD 17)

set(RESOURCES "src/resources/TestApp.rc")

set(CMAKE_EXE_LINKER_FLAGS "${CMAKE_EXE_LINKER_FLAGS} -mwindows -municode")

if (MSVC)
    add_compile_options(/W4)
else ()
    add_compile_options(-Wall -Wextra -Wpedantic -Werror)
endif ()

add_executable(
        ${PROJECT_NAME} WIN32
        src/main.cpp
        ${RESOURCES}
        src/include/framework.h
        src/include/handles.h
        src/include/util.h
        src/include/resource.h
)

target_link_libraries(
        ${PROJECT_NAME}
        PRIVATE
        comctl32
        uxtheme
)

if (MSVC)
    target_link_options(${PROJECT_NAME} PRIVATE /MANIFEST:NO)
endif ()
