import config from './jest.config.browser';
import { resolve } from 'path';

export default {
  ...config,
  projects: [resolve(__dirname, 'jest.config.node.ts')],
  setupFilesAfterEnv: [resolve(__dirname, 'tests/setup-node.ts')],
  testEnvironment: 'node',
};
