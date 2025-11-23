import { inspect } from 'node:util';

import { IKoffiCType } from 'koffi';

import { Nominal, Win32Type } from '../@types/win32';

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
  Blue: '\x1b[34m',
  Green: '\x1b[32m',
  Yellow: '\x1b[33m',
  Red: '\x1b[31m',
  White: '\x1b[41m\x1b[37m',
  Reset: '\x1b[0m',
} as const;

type Message =
  | string
  | number
  | boolean
  | bigint
  | IKoffiCType
  | Win32Type<Nominal<unknown, unknown>>
  | null
  | undefined
  | object
  | Error;

export class Logger {
  readonly logLevel: LogLevel;

  private readonly pid: string;
  private readonly useColors: boolean;

  private readonly context: string;

  constructor(context: string) {
    this.pid = process.pid.toString().padEnd(5, ' ');
    this.useColors = process.env.NO_COLOR !== '1';

    const envLogLevel = process.env.AIT_LOG_LEVEL?.padStart(5, ' ')?.toUpperCase() ?? labels[LogLevel.Info];

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

    this.context = context;
  }

  debug(...values: Message[]): boolean {
    return this.write(LogLevel.Debug, values);
  }

  info(...values: Message[]): boolean {
    return this.write(LogLevel.Info, values);
  }

  warn(...values: Message[]): boolean {
    return this.write(LogLevel.Warn, values);
  }

  error(...values: Message[]): boolean {
    return this.write(LogLevel.Error, values);
  }

  fatal(...values: Message[]): boolean {
    return this.write(LogLevel.Fatal, values);
  }

  logFunctionCall(functionName: string, functionArguments: unknown[], functionResult: unknown): void {
    // Short-circuit to avoid needless work in parsing the argument and result types
    if (this.logLevel > LogLevel.Debug) {
      return;
    }

    const fnName = this.colorizeManual(colors.Green, functionName);
    let fnArgs = '';
    const arrow = this.colorizeManual(colors.Yellow, '=>');
    const fnResult = this.colorizeManual(colors.Green, this.parseType(functionResult));

    for (let i = 0; i < functionArguments.length; i++) {
      fnArgs += this.colorizeManual(colors.Blue, this.parseType(functionArguments[i]));

      if (i < functionArguments.length - 1) {
        fnArgs += this.colorizeManual(colors.Reset, ', ');
      }
    }

    this.debug(`${fnName}(${fnArgs}) ${arrow} ${fnResult}`);
  }

  private parseType(value: unknown): string {
    switch (typeof value) {
      case 'string':
        return `"${value}"`;
      case 'number':
      case 'bigint':
      case 'boolean':
        return `${value}`;
      case 'undefined':
        return 'undefined';
      case 'object':
        return value === null ? 'null' : inspect(value, { depth: 1, compact: true, breakLength: Infinity });
      default:
        return typeof value;
    }
  }

  private write(logLevel: LogLevel, values: Message[]): boolean {
    if (logLevel < this.logLevel) {
      return false;
    }

    const pid = this.colorize(logLevel, this.pid);
    const timestamp = new Date().toLocaleString('en-US');
    const logLevelLabel = this.colorize(logLevel, labels[logLevel]);
    const loggerName = this.colorize(LogLevel.Warn, `[${this.context}]`);
    const messages = this.colorize(logLevel, values.map(this.formatValue).join(' '));

    process.stdout.write(`${pid} - ${timestamp} ${logLevelLabel} ${loggerName} ${messages}\n`);

    return true;
  }

  private formatValue(value: Message): string {
    if (value instanceof Error) {
      return value.stack ?? value.message;
    } else if (typeof value === 'object' || Array.isArray(value)) {
      return JSON.stringify(value);
    }

    return `${value}`;
  }

  private colorize(logLevel: LogLevel, message: string): string {
    if (!this.useColors) {
      return message;
    }

    const color = colors[logLevel];
    const reset = colors.Reset;

    return `${color}${message}${reset}`;
  }

  private colorizeManual(color: (typeof colors)[keyof typeof colors], message: string): string {
    if (!this.useColors) {
      return message;
    }

    const reset = colors.Reset;

    return `${color}${message}${reset}`;
  }
}
