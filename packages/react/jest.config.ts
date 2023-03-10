export default {
  preset: 'ts-jest/presets/js-with-ts',
  setupFilesAfterEnv: ['./src/__helpers__/jest.setup.ts'],
  testEnvironment: 'jsdom',
  testRegex: '/__tests__/.*|(\\.|/)spec\\.tsx?$',
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],

  // You might ask: why "preact" is here? Well, it's because it's part of Lit Protocol SDK dependencies  ¯\_(ツ)_/¯
  transformIgnorePatterns: [`/node_modules/\.pnpm/(?!@lens-protocol/.+|preact)`],
};
