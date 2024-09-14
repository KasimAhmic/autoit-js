import { Logger } from './util/logger';

const logger = new Logger('Main');

logger.error(new Error('testing'));
