module.exports = {
  root: true,
  extends: [
    '@lens-protocol/eslint-config',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/jsx-runtime',
  ],
  plugins: ['react', 'react-hooks'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'react/prop-types': 'off',
    'react/no-unescaped-entities': 'off',
    'react/jsx-curly-brace-presence': [
      'error',
      { props: 'never', children: 'never', propElementValues: 'always' },
    ],
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: 'lodash',
            message: 'Please use lodash submodules imports.',
          },
          {
            name: 'lodash/fp',
            message: 'Please use lodash submodules imports.',
          },
          {
            name: '@apollo/client/testing',
            importNames: ['createMockClient'],
            message: 'Please import "mockLensApolloClient" from @lens-protocol/api-bindings/mocks.',
          },
          {
            name: '@apollo/client',
            importNames: ['ApolloClient'],
            message: 'Please use "createApolloClient" from @lens-protocol/api-bindings.',
          },
        ],
      },
    ],
  },
};
