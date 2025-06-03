import { resolve } from 'node:path';
import { loadEnv } from 'vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  root: './',
  test: {
    setupFiles: [resolve(__dirname, './vitest.setup.ts')],
    env: loadEnv('', process.cwd(), ''),
    testTimeout: 10_000,
    hookTimeout: 15_000,
    fileParallelism: false,
    projects: [
      {
        extends: true,
        test: {
          name: 'react',
          environment: 'happy-dom',
          setupFiles: [resolve(__dirname, './packages/react/vitest.setup.ts')],
          include: ['packages/react/**/*.{unit,integration}.test.{ts,tsx}'],
        },
      },
      {
        extends: true,
        test: {
          name: 'client',
          include: ['packages/client/**/*.{unit,integration}.test.{ts,tsx}'],
          environment: 'node',
        },
      },
      {
        extends: true,
        test: {
          name: 'storage',
          include: ['packages/storage/**/*.{unit,integration}.test.{ts,tsx}'],
          environment: 'node',
        },
      },
      {
        extends: true,
        test: {
          name: 'e2e',
          include: ['packages/**/*.{e2e}.test.{ts,tsx}'],
          environment: 'node',
        },
      },
    ],
  },
});
