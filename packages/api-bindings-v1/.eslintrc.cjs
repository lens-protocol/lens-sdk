module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  extends: ['@lens-protocol/eslint-config'],
  rules: {
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: '@apollo/client',
            importNames: ['createHttpLink', 'HttpLink'],
            message: 'Please terminating links from src/apollo/links.ts.',
          },
        ],
      },
    ],
  },
};
