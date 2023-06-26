// eslint-disable-next-line import/no-default-export
export default {
  preset: 'ts-jest/presets/js-with-ts',
  setupFilesAfterEnv: ['./src/__helpers__/jest.setup.ts'],
  testEnvironment: 'jsdom',
  testRegex: '/__tests__/.*|(\\.|/)spec\\.tsx?$',
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
};
