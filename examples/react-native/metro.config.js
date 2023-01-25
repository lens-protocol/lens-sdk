// Changes in the metro config are only required for the example app to work in our monorepo setup
// They are NOT required to be done when using `@lens-protocol/react`

const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");
const MetroSymlinksResolver = require("@rnx-kit/metro-resolver-symlinks");

const config = getDefaultConfig(__dirname);

// point for `@lens-protocol` linked packages how to resolve `@babel/runtime`
config.resolver.extraNodeModules["@babel/runtime"] = path.resolve(
  path.join(__dirname, "./node_modules"),
  "@babel/runtime"
);
// point for `@lens-protocol/react` how to resolve react without having 2 duplicated versions
config.resolver.extraNodeModules["react"] = path.resolve(
  path.join(__dirname, "./node_modules"),
  "react"
);
// makes sure that metro resolves the symlinks properly
config.resolver.resolveRequest = MetroSymlinksResolver();

module.exports = config;
