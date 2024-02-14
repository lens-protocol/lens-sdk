# Lens React Web SDK

The official Lens Protocol React bindings for web applications.

---

This package enables you to build web applications on top of the Lens Protocol using React.

## Documentation

- [GitHub monorepo](https://github.com/lens-protocol/lens-sdk)
- [Getting Started](https://docs.lens.xyz/docs/react-hooks-sdk-v2)
- [Reference](https://lens-protocol.github.io/lens-sdk/modules/_lens_protocol_react_web.html)

## Quick start

Install the Lens React Web SDK package using your package manager of choice:

| Package Manager | Command                                       |
| :-------------: | :-------------------------------------------- |
|       npm       | `npm install @lens-protocol/react-web@latest` |
|      yarn       | `yarn add @lens-protocol/react-web@latest`    |
|      pnpm       | `pnpm add @lens-protocol/react-web@latest`    |

In the following examples we will show you integration with Wagmi and we will explain later how to integrate other libraries via custom bindings.

Install the Lens Wagmi bindings package and its peer dependencies.

| Package Manager | Command                                                                              |
| :-------------: | :----------------------------------------------------------------------------------- |
|       npm       | `npm install viem@2 wagmi@2 @tanstack/react-query@5 @lens-protocol/wagmi@latest`     |
|      yarn       | `yarn add viem@2 viem@2 wagmi@2 @tanstack/react-query@5 @lens-protocol/wagmi@latest` |
|      pnpm       | `pnpm add viem@2 viem@2 wagmi@2 @tanstack/react-query@5 @lens-protocol/wagmi@latest` |

Follow the [Wagmi documentation](https://wagmi.sh/react/getting-started#create-config) to create the Wagmi configuration.

```ts
import { createConfig, http } from 'wagmi';
import { polygon } from 'wagmi/chains';

const wagmiConfig = createConfig({
  chains: [polygon],
  transports: {
    [polygon.id]: http(),
  },
});
```

Next, use this configuration with the `bindings` from the `@lens-protocol/wagmi` package to generate the [LensConfig](https://lens-protocol.github.io/lens-sdk/types/_lens_protocol_react_web.index.LensConfig.html) object.

```ts
import { LensConfig, production } from '@lens-protocol/react-web';
import { bindings } from '@lens-protocol/wagmi';

const lensConfig: LensConfig = {
  environment: production,
  bindings: bindings(wagmiConfig),
};
```

Now, wrap your app with the `<LensProvider>` component and pass the `LensConfig` object you created earlier.

```tsx
import { LensProvider } from '@lens-protocol/react-web';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';

const queryClient = new QueryClient();

function App() {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <LensProvider config={lensConfig}>
          <YourApp />
        </LensProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
```

### Custom bindings

You can create custom bindings for your own `Signer` and `Provider` by implementing the {@link IBindings} interface.

An example of how to create custom bindings for a `Wallet` from `ethers.js`

```ts
import { InfuraProvider, Wallet } from 'ethers';
import { IBindings } from '@lens-protocol/react-web';

const provider = new providers.InfuraProvider('maticmum');
const wallet = new Wallet('<your-private-key>', provider);

const bindings: IBindings = {
  getProvider: () => provider,
  getSigner: () => wallet,
};
```

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
