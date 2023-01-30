/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Until the @apollo-client fixes the ESM modules support (https://github.com/apollographql/apollo-feature-requests/issues/287)
  // it's required to either transpile the `@lens-protocol` packages or make sure they won't get `imported` during SSR.
  transpilePackages: ['@lens-protocol'],
};

module.exports = nextConfig;
