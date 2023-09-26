# `@lens-protocol/react`

The official Lens Protocol bindings for React applications.

This package enables you to build applications on top of the Lens Protocol using React.

> **Note**
>
> This is a low-level package, if you are building a web application you might want to look into `@lens-protocol/react-web` package.
>
> You can use this package to build a React Native app, see the `example/react-native` example in this repo. In the future we are considering to provide a battery-included `@lens-protocol/react-native` package for RN apps.

## Documentation

- [GitHub monorepo](https://github.com/lens-protocol/lens-sdk)
- [Getting Started](https://docs.lens.xyz/docs/sdk-react-getting-started)

## Troubleshooting

These are some common issues you may run into while using `@lens-protocol/react`. If you encounter something not listed here try searching for [GitHub issues](https://github.com/lens-protocol/lens-sdk/issues).

### Next.js build failing

You might see your Next.js failing with an error like this:

```
Error: Directory import '[...]/node_modules/@apollo/client/link/context' is not supported resolving ES modules imported from [...]/node_modules/@lens-protocol/api-bindings/dist/index.js
Did you mean to import @apollo/client/link/context/context.cjs?
```

The root cause is the lack of ESM support from Apollo Client which manifests itself when imported as sub-dependency of `@lens-protocol/api-bindings` (which in turn is imported by `@lens-protocol/react`). See open Apollo Client [issue](https://github.com/apollographql/apollo-feature-requests/issues/287).

To fix it you need to edit you `next.config.js` so to make sure the Lens SDK and its sub-dependencies a transpiled by Next.js build pipeline.

```js
const nextConfig = {
  transpilePackages: ['@lens-protocol'],
};
```

For further details on how to integrate Lens SDK with a Next.js app, there is a working Next.js example in this monorepo: https://github.com/lens-protocol/lens-sdk/tree/main/examples/nextjs
