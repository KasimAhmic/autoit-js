#pragma once

#include <string>
#include <utility>
#include <ctime>
#include <iomanip>
#include <sstream>

constexpr auto LEVEL_VERBOSE = "VERBOSE";
constexpr auto LEVEL_DEBUG = "  DEBUG";
constexpr auto LEVEL_INFO = "   INFO";
constexpr auto LEVEL_WARN = "   WARN";
constexpr auto LEVEL_ERROR = "  ERROR";
constexpr auto LEVEL_FATAL = "  FATAL";

constexpr auto APP_NAME = "[TestApp]";
constexpr auto SPACE = " ";
constexpr auto DASH = " - ";

class Logger {
public:
    explicit Logger(std::string name) {
        this->name = "[" + std::move(name) + "]";
        this->pid = padRight(std::to_string(GetCurrentProcessId()), 6, ' ');
    }

    void verbose(const std::string &message) const {
        this->log(LEVEL_VERBOSE, message);
    }

    void debug(const std::string &message) const {
        this->log(LEVEL_DEBUG, message);
    }

    void info(const std::string &message) const {
        this->log(LEVEL_INFO, message);
    }

    void warn(const std::string &message) const {
        this->log(LEVEL_WARN, message);
    }

    void error(const std::string &message) const {
        this->log(LEVEL_ERROR, message);
    }

    void fatal(const std::string &message) const {
        this->log(LEVEL_FATAL, message);
    }

    static std::string padRight(const std::string &str, const size_t num, const char paddingChar = ' ') {
        if (num > str.size()) {
            return str + std::string(num - str.size(), paddingChar);
        }

        return str;
    }

    ~Logger() = default;

private:
    std::string name;
    std::string pid;

    void log(const std::string &level, const std::string &message) const {
        std::cout <<
                std::string(APP_NAME) +
                SPACE +
                this->pid +
                DASH +
                timestamp() +
                SPACE +
                level +
                SPACE +
                this->name +
                SPACE +
                message
                << std::endl;
    }

    static std::string timestamp() {
        const std::time_t now = std::time(nullptr);
        const std::tm *localTime = std::localtime(&now);

        std::ostringstream timeStream;
        timeStream << std::put_time(localTime, "%m/%d/%Y, %I:%M:%S %p");

        return timeStream.str();
    }
};
