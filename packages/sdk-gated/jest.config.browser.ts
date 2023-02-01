const pack = require('./package.json');
import config from '../packages/jest/jest.config';
import { resolve } from 'path';

export default {
  ...config,
  displayName: pack.name,
  preset: 'ts-jest/presets/js-with-ts-esm',
  testRegex: [resolve(__dirname, 'tests/.*\\.test\\.ts$')],
  projects: [resolve(__dirname, 'jest.config.browser.ts')],
  setupFiles: [resolve(__dirname, 'tests/setup-env.ts')],
  setupFilesAfterEnv: [resolve(__dirname, 'tests/setup-browser.ts')],
  moduleDirectories: ['node_modules', 'src', 'dist'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.m?js$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(uint8arrays|multiformats|@ethersproject|cross-blob|fetch-blob)/)',
  ],
  globals: {
    'ts-jest': {
      tsconfig: resolve(__dirname, 'tsconfig.json'),
    },
  },
};
