/** @type {import('next').NextConfig} */
const nextConfig = {
  // Until the @apollo-client fixes the ESM modules support (https://github.com/apollographql/apollo-feature-requests/issues/287)
  // it's required to either transpile the `@lens-protocol` packages or make sure they won't get `imported` during SSR.
  transpilePackages: ["@lens-protocol"],

  webpack: (config) => {
    // Ignore warnings from the 3rd party packages
    config.ignoreWarnings = [
      { module: /pino/ },
      { module: /node-gyp-build/ },
      { module: /@metamask/ },
    ];

    return config;
  },
};

export default nextConfig;
