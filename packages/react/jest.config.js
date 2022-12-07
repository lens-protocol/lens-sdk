export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testRegex: '/__tests__/.*|(\\.|/)spec\\.tsx?$',
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
};
