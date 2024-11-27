import { resolve } from 'node:path';
import { loadEnv } from 'vite';
// import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  root: './',
  test: {
    setupFiles: [resolve(__dirname, './vitest.setup.ts')],
    env: loadEnv('', process.cwd(), ''),
    environment: 'node',
  },
});
