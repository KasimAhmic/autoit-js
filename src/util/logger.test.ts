import { Logger } from './logger';

describe('Logger @full @quick', () => {
  let originalEnvLogLevel: string | undefined;
  let originalEnvNoColor: string | undefined;

  beforeAll(() => {
    originalEnvLogLevel = process.env.AIT_LOG_LEVEL;
    originalEnvNoColor = process.env.NO_COLOR;
  });

  afterEach(() => {
    process.env.AIT_LOG_LEVEL = originalEnvLogLevel;
    process.env.NO_COLOR = originalEnvNoColor;

    vi.clearAllMocks();
  });

  it.each([
    { logLevel: 'debug', debug: true, info: true, warn: true, error: true, fatal: true },
    { logLevel: 'info', debug: false, info: true, warn: true, error: true, fatal: true },
    { logLevel: undefined, debug: false, info: true, warn: true, error: true, fatal: true },
    { logLevel: 'someInvalidValue', debug: false, info: true, warn: true, error: true, fatal: true },
    { logLevel: 'warn', debug: false, info: false, warn: true, error: true, fatal: true },
    { logLevel: 'error', debug: false, info: false, warn: false, error: true, fatal: true },
    { logLevel: 'fatal', debug: false, info: false, warn: false, error: false, fatal: true },
  ])(`logs correct levels when the level is $logLevel`, ({ logLevel, debug, info, warn, error, fatal }) => {
    process.env.AIT_LOG_LEVEL = logLevel;

    const logger = new Logger('TestLogger');

    const debugLogged = logger.debug('Debug message');
    const infoLogged = logger.info('Info message');
    const warnLogged = logger.warn('Warn message');
    const errorLogged = logger.error('Error message');
    const fatalLogged = logger.fatal('Fatal message');

    expect(debugLogged).toBe(debug);
    expect(infoLogged).toBe(info);
    expect(warnLogged).toBe(warn);
    expect(errorLogged).toBe(error);
    expect(fatalLogged).toBe(fatal);
  });

  it('logs an object message correctly', () => {
    const logger = new Logger('TestLogger');

    const processStdoutWriteSpy = vi.spyOn(process.stdout, 'write');

    const messageObject = { key: 'value', number: 42 };
    const infoLogged = logger.info(messageObject);

    expect(infoLogged).toBe(true);
    expect(processStdoutWriteSpy.mock.calls[0][0]).toContain(`{"key":"value","number":42}`);
  });

  it('logs messages at the info level by default', () => {
    process.env.AIT_LOG_LEVEL = undefined;

    const logger = new Logger('TestLogger');

    const debugLogged = logger.debug('Debug message');
    const infoLogged = logger.info('Info message');

    expect(debugLogged).toBe(false);
    expect(infoLogged).toBe(true);
  });

  it('logs the stack trace when an error is passed', () => {
    const logger = new Logger('TestLogger');

    const processStdoutWriteSpy = vi.spyOn(process.stdout, 'write');

    const error = new Error('Test error');
    const errorLogged = logger.error(error);

    expect(errorLogged).toBe(true);
    expect(processStdoutWriteSpy.mock.calls[0][0]).toContain(error.stack);
  });

  it('logs the error message if the stack trace is not available', () => {
    const logger = new Logger('TestLogger');

    const processStdoutWriteSpy = vi.spyOn(process.stdout, 'write');

    const error = new Error('Test error');
    error.stack = undefined;
    const errorLogged = logger.error(error);

    expect(errorLogged).toBe(true);
    expect(processStdoutWriteSpy.mock.calls[0][0]).toContain(error.message);
  });

  it("doesn't use colors when the NO_COLOR environment variable is set", () => {
    process.env.NO_COLOR = '1';

    const logger = new Logger('TestLogger');

    const processStdoutWriteSpy = vi.spyOn(process.stdout, 'write');

    logger.error('Test message');

    expect(processStdoutWriteSpy.mock.calls[0][0]).not.toContain('\x1b');
  });

  it('logs a function call with colors', () => {
    process.env.AIT_LOG_LEVEL = 'debug';
    process.env.NO_COLOR = '1';

    const logger = new Logger('TestLogger');

    const processStdoutWriteSpy = vi.spyOn(process.stdout, 'write');

    logger.logFunctionCall('myFunction', ['arg1', 42, true], true);

    expect(processStdoutWriteSpy.mock.calls[0][0]).toEqual(
      expect.stringContaining('myFunction("arg1", 42, true) => true'),
    );
  });

  it('logs a function call without colors', () => {
    process.env.AIT_LOG_LEVEL = 'debug';

    const logger = new Logger('TestLogger');

    const processStdoutWriteSpy = vi.spyOn(process.stdout, 'write');

    logger.logFunctionCall('myFunction', ['arg1', 42, true], true);

    expect(processStdoutWriteSpy.mock.calls[0][0]).toEqual(
      expect.stringContaining(
        '[32mmyFunction\u001b[0m(\u001b[34m"arg1"\u001b[0m\u001b[0m, \u001b[0m\u001b[34m42\u001b[0m\u001b[0m, \u001b[0m\u001b[34mtrue\u001b[0m) \u001b[33m=>\u001b[0m \u001b[32mtrue\u001b[0m\u001b[0m',
      ),
    );
  });

  it('does not log a function call at levels above debug', () => {
    process.env.AIT_LOG_LEVEL = 'info';
    process.env.NO_COLOR = '1';

    const logger = new Logger('TestLogger');

    const processStdoutWriteSpy = vi.spyOn(process.stdout, 'write');

    logger.logFunctionCall('myFunction', ['arg1', 42, true], true);

    expect(processStdoutWriteSpy).not.toHaveBeenCalled();
  });

  it('handles complex argument and result types in function call logging', () => {
    process.env.AIT_LOG_LEVEL = 'debug';
    process.env.NO_COLOR = '1';

    const logger = new Logger('TestLogger');

    const processStdoutWriteSpy = vi.spyOn(process.stdout, 'write');

    logger.logFunctionCall(
      'complexFunction',
      ['string', 123, true, null, undefined, { key: 'value' }, [1, 2, 3], (x: number) => x * 2],
      { resultKey: 'resultValue' },
    );

    expect(processStdoutWriteSpy.mock.calls[0][0]).toEqual(
      expect.stringContaining(
        `complexFunction("string", 123, true, null, undefined, { key: 'value' }, [ 1, 2, 3 ], function) => { resultKey: 'resultValue' }`,
      ),
    );
  });
});
