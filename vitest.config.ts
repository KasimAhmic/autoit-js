import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    api: 9527,
    globals: true,
    coverage: {
      all: true,
      enabled: true,
      provider: 'v8',
      thresholds: {
        branches: 75,
        functions: 75,
        lines: 75,
        statements: 75,
      },
    },
  },
});
