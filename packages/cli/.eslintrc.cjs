module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  extends: ['@lens-protocol/eslint-config'],
  rules: {
    'no-console': 'off',
  },
};
