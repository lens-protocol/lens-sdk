/* eslint-disable import/no-default-export */
import { defineConfig } from 'tsup';

export default defineConfig(() => ({
  outDir: 'dist',
  splitting: false,
  sourcemap: true,
  treeshake: true,
  clean: true,
  tsconfig: 'tsconfig.build.json',
  bundle: true,
  minify: true,
  dts: {
    entry: ['src/index.ts', 'src/test-utils.ts'],
  },
  entry: ['src/schema.json', 'src/index.ts', 'src/test-utils.ts'],
  platform: 'neutral',
  format: ['esm', 'cjs'],
  loader: {
    '.graphql': 'text',
    '.json': 'copy',
  },
}));
