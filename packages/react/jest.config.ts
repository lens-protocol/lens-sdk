export default {
  preset: 'ts-jest/presets/js-with-ts',
  testEnvironment: 'jsdom',
  testRegex: '/__tests__/.*|(\\.|/)spec\\.tsx?$',
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  transformIgnorePatterns: [`/node_modules/(?!@lens-protocol/*)`],
};
