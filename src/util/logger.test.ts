import { Logger } from './logger';

describe('Logger', () => {
  let originalEnvLogLevel: string | undefined;
  let originalEnvNoColor: string | undefined;

  beforeAll(() => {
    originalEnvLogLevel = process.env.LOG_LEVEL;
    originalEnvNoColor = process.env.NO_COLOR;
  });

  afterEach(() => {
    process.env.LOG_LEVEL = originalEnvLogLevel;
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
    process.env.LOG_LEVEL = logLevel;

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

  it('logs the stack trace when an error is passed', () => {
    const logger = new Logger('TestLogger');

    const processStdoutWriteSpy = vi.spyOn(process.stdout, 'write');

    const error = new Error('Test error');
    const errorLogged = logger.error(error);

    expect(errorLogged).toBe(true);
    expect(processStdoutWriteSpy.mock.calls[0][0]).toContain(error.stack);
  });

  it("doesn't use colors when the NO_COLOR environment variable is set", () => {
    process.env.NO_COLOR = '1';

    const logger = new Logger('TestLogger');

    const processStdoutWriteSpy = vi.spyOn(process.stdout, 'write');

    logger.error('Test message');

    expect(processStdoutWriteSpy.mock.calls[0][0]).not.toContain('\x1b');
  });
});
