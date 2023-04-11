export default {
  preset: 'ts-jest/presets/js-with-ts',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  transformIgnorePatterns: [`/node_modules/(?!@lens-protocol/*)`],
  testTimeout: 30000,
};
