import { platform } from 'node:os';

import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    api: 9527,
    globals: true,
    maxWorkers: 1,
    exclude: platform() !== 'win32' ? ['**/node_modules/**', '**/autoit-*.test.ts'] : ['**/node_modules/**'],
    coverage: {
      enabled: true,
      provider: 'v8',
      thresholds: {
        // Until we figure out to get a Windows runner in GitHub Actions, we won't be able to run the full
        // test suite (which includes test for AutoIt itself) nor will we be able to collect coverage for it.
        'src/util/*': {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },
      },
    },
  },
});
