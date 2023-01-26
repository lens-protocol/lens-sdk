// Changes in the metro config are only required for the example app to work in our monorepo setup
// They are NOT needed when using `@lens-protocol/react` outside our monorepo

const path = require('path');
const {makeMetroConfig} = require('@rnx-kit/metro-config');
const MetroSymlinksResolver = require('@rnx-kit/metro-resolver-symlinks');

const config = makeMetroConfig({
  resetCache: true,
  projectRoot: __dirname,
  resolver: {
    // makes sure that metro resolves the symlinks used by linked packages
    resolveRequest: MetroSymlinksResolver(),
    extraNodeModules: {
      // // point for `@lens-protocol` linked packages how to resolve `@babel/runtime`
      '@babel/runtime': path.resolve(__dirname, './node_modules/@babel/runtime'),
      // // '@lens-protocol/react': path.resolve(__dirname, 'node_modules/@lens-protocol/react'),
      // // point for `@lens-protocol/react` how to resolve react without having 2 duplicated versions
      react: path.resolve(__dirname, 'node_modules/react'),
      ethers: path.resolve(__dirname, 'node_modules/ethers'),
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

console.log(config);

module.exports = config;
