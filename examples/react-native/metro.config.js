// Changes in the metro config are only required for the example app to work in our monorepo setup
// They are NOT needed when using `@lens-protocol/react` outside our monorepo

const path = require('path');

const { makeMetroConfig } = require('@rnx-kit/metro-config');
const MetroSymlinksResolver = require('@rnx-kit/metro-resolver-symlinks');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = makeMetroConfig({
  resetCache: true,
  projectRoot: __dirname,
  resolver: {
    // makes sure that metro resolves the symlinks used by linked packages
    resolveRequest: MetroSymlinksResolver(),
    extraNodeModules: {
      // point how `@lens-protocol` linked packages should resolve `@babel/runtime`
      '@babel/runtime': path.resolve(__dirname, './node_modules/@babel/runtime'),
      // point how  `@lens-protocol` linked packages should resolve react without having 2 duplicated versions
      react: path.resolve(__dirname, 'node_modules/react'),
    },
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  watchFolders: [path.resolve(__dirname, '../..')],
});

module.exports = config;
