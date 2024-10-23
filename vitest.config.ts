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
    // alias: {
    //   '@lens-social/env': '/Users/brainjammer/workspace/lens-sdk-v3/packages/env/src',
    // },
  },
  // plugins: [
  //   tsconfigPaths({
  //     ignoreConfigErrors: true,
  //     // configNames: ['tsconfig.base.json'],
  //     // projects: ['packages/types/tsconfig.json', 'packages/graphql/tsconfig.json'],
  //     loose: true,
  //   }),
  // ],
  // resolve: {
  //   alias: {
  //     '@lens-social/*': '/Users/brainjammer/workspace/lens-sdk-v3/packages/*/src',
  //   },
  // },

  // logLevel: 'info',
});
