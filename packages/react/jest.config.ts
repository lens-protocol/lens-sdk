export default {
  preset: 'ts-jest/presets/js-with-ts',
  setupFilesAfterEnv: ['./src/__helpers__/jest.setup.ts'],
  testEnvironment: 'jsdom',
  testRegex: '/__tests__/.*|(\\.|/)spec\\.tsx?$',
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],

  transformIgnorePatterns: [`/node_modules/\.pnpm/(?!@lens-protocol/.+)`],
};
