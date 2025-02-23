import typescript from '@rollup/plugin-typescript';

/** @type {import('rollup').RollupOptions} */
const options = {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'esm',
    preserveModules: true,
    sourcemap: true,
    entryFileNames: '[name].js',
  },
  external: ['node:os', 'node:path', 'node:url', 'node:util', 'koffi'],
  plugins: [
    typescript({
      exclude: 'src/**/*.test.*',
    }),
  ],
};

export default options;
