enum LogLevel {
  Debug,
  Info,
  Warn,
  Error,
  Fatal,
}

const labels = {
  [LogLevel.Debug]: 'DEBUG',
  [LogLevel.Info]: ' INFO',
  [LogLevel.Warn]: ' WARN',
  [LogLevel.Error]: 'ERROR',
  [LogLevel.Fatal]: 'FATAL',
} as const;

const colors = {
  [LogLevel.Debug]: '\x1b[34m',
  [LogLevel.Info]: '\x1b[32m',
  [LogLevel.Warn]: '\x1b[33m',
  [LogLevel.Error]: '\x1b[31m',
  [LogLevel.Fatal]: '\x1b[41m\x1b[37m',
  RESET: '\x1b[0m',
} as const;

export class Logger {
  private readonly applicationName: string;
  private readonly pid: string;
  private readonly useColors: boolean;
  private readonly logLevel: LogLevel;

  private readonly name: string;

  constructor(name: string) {
    this.applicationName = 'AutoIt JS';
    this.pid = process.pid.toString().padEnd(5, ' ');
    this.useColors = process.env.NO_COLOR !== '1';

    const envLogLevel = process.env.LOG_LEVEL?.padStart(5, ' ').toUpperCase();

    switch (envLogLevel) {
      case labels[LogLevel.Debug]:
        this.logLevel = LogLevel.Debug;
        break;

      case labels[LogLevel.Info]:
        this.logLevel = LogLevel.Info;
        break;

      case labels[LogLevel.Warn]:
        this.logLevel = LogLevel.Warn;
        break;

      case labels[LogLevel.Error]:
        this.logLevel = LogLevel.Error;
        break;

      case labels[LogLevel.Fatal]:
        this.logLevel = LogLevel.Fatal;
        break;

      default:
        this.logLevel = LogLevel.Info;
    }

    this.name = name;
  }

  debug(...values: any[]): boolean {
    return this.write(LogLevel.Debug, values);
  }

  info(...values: any[]): boolean {
    return this.write(LogLevel.Info, values);
  }

  warn(...values: any[]): boolean {
    return this.write(LogLevel.Warn, values);
  }

  error(...values: any[]): boolean {
    return this.write(LogLevel.Error, values);
  }

  fatal(...values: any[]): boolean {
    return this.write(LogLevel.Fatal, values);
  }

  private write(logLevel: LogLevel, values: any[]): boolean {
    if (logLevel < this.logLevel) {
      return false;
    }

    const applicationName = this.colorize(logLevel, `[${this.applicationName}]`);
    const pid = this.colorize(logLevel, this.pid);
    const timestamp = new Date().toLocaleString('en-US');
    const logLevelLabel = this.colorize(logLevel, labels[logLevel]);
    const loggerName = this.colorize(LogLevel.Warn, `[${this.name}]`);
    const messages = this.colorize(logLevel, values.map(this.formatValue).join(' '));

    const logMessage = `${applicationName} ${pid} - ${timestamp} ${logLevelLabel} ${loggerName} ${messages}\n`;

    process.stdout.write(logMessage);

    return true;
  }

  private formatValue(value: any): string {
    if (value instanceof Error) {
      return value.stack ?? value.message;
    } else if (typeof value === 'object' || Array.isArray(value)) {
      return JSON.stringify(value);
    }

    return value;
  }

  private colorize(logLevel: LogLevel, message: string): string {
    if (!this.useColors) {
      return message;
    }

    const color = colors[logLevel];
    const reset = colors.RESET;

    return `${color}${message}${reset}`;
  }
}
