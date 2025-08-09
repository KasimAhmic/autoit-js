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
      // Let tsc create the declaration files and leave the comments there. Strip it out in the JS code.
      declaration: false,
      removeComments: true,
      exclude: 'src/**/*.test.*',
    }),
  ],
};

export default options;
