/* eslint-disable import/no-default-export */
import { defineConfig } from 'tsup';

export default defineConfig(() => ({
  entry: ['src/index.ts', 'src/test-utils.ts', 'src/schema.ts'],
  outDir: 'dist',
  splitting: false,
  sourcemap: true,
  treeshake: true,
  clean: true,
  tsconfig: 'tsconfig.build.json',
  bundle: true,
  minify: true,
  dts: true,
  platform: 'neutral',
  format: ['esm', 'cjs'],
  loader: {
    '.graphql': 'text',
    '.json': 'json',
  },
}));
