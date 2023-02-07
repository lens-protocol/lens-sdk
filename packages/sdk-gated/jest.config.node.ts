import config from './jest.config.browser';

export default {
  ...config,
  setupFilesAfterEnv: ['./tests/setup-node.ts'],
  testEnvironment: 'node',
};
