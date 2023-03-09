# `@lens-protocol/react`

The official React bindings for the Lens Protocol.

> **Warning**
>
> The Lens SDK is still in its initial development phase. Anything MAY change at any time.
> This is a Developer Preview aimed primarily at existing integrators so to gather [early feedback](https://github.com/lens-protocol/lens-sdk/discussions/48).

This package enables you to build applications on top of the Lens Protocol using React.

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

### Cannot retrieve wagmi `Signer`

If you are using Lens SDK with wagmi via the `@lens-protocol/wagmi` bindings and you might have seen this error:

```
InvariantError: Cannot get signer, is the wallet connected?
  [stack trace]
```

This is most likely caused by wagmi not being able to auto-reconnect with a browser extension wallet after a network switch in your wallet.

When configuring your wagmi connectors make sure you set the [`shimChainChangedDisconnect`](https://wagmi.sh/core/connectors/injected#shimchainchangeddisconnect) flag in your `InjectedConnector` (or [`MetaMaskConnector`](https://wagmi.sh/core/connectors/metaMask#shimchainchangeddisconnect)).

```tsx
useConnect({
  connector: new InjectedConnector({
    options: {
      shimChainChangedDisconnect: true,
    },
  }),
});
```
