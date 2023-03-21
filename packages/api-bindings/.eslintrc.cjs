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
            message: 'Please use "createHttpLink" from src/apollo/links.ts.',
          },
        ],
      },
    ],
  },
};
