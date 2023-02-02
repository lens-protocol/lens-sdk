import * as path from 'path';

export default {
  preset: 'ts-jest/presets/js-with-ts-esm',
  testRegex: ['tests/.*\\.test\\.ts$'],
  setupFiles: ['./tests/setup-env.ts'],
  setupFilesAfterEnv: ['./tests/setup-browser.ts'],
  testEnvironment: 'jsdom',
  transformIgnorePatterns: [
    `${path.join(
      __dirname,
      '../..'
    )}/node_modules/.pnpm/(?!(uint8arrays|multiformats|@ethersproject|cross-blob|fetch-blob))`,
  ],
};
