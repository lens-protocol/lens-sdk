import { loadEnv } from 'vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    setupFiles: ['./vitest.setup.ts'],
    env: loadEnv('', process.cwd(), ''),
    environment: 'node',
  },
});
