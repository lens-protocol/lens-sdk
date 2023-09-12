module.exports = {
  root: true,
  extends: ['@lens-protocol/eslint-config'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  rules: {
    'no-console': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
  },
};
