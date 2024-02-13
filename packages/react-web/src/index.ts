/**
 * @module Core
 *
 * ## Quick start
 *
 * Install the Lens React Web SDK package.
 *
 * | Package Manager | Command |
 * |:---------------:|:------- |
 * | npm             | `npm install @lens-protocol/react-web@latest` |
 * | yarn            | `yarn add @lens-protocol/react-web@latest` |
 * | pnpm            | `pnpm add @lens-protocol/react-web@latest` |
 *
 * In the following examples we will show you integration with Wagmi and we will explain later how to integrate other libraries via custom bindings.
 *
 * Install the Lens Wagmi bindings package and its peer dependencies.
 *
 * | Package Manager | Command |
 * |:---------------:|:------- |
 * | npm             | `npm install viem@2 wagmi@2 @tanstack/react-query@5 @lens-protocol/wagmi@latest` |
 * | yarn            | `yarn add viem@2 viem@2 wagmi@2 @tanstack/react-query@5 @lens-protocol/wagmi@latest` |
 * | pnpm            | `pnpm add viem@2 viem@2 wagmi@2 @tanstack/react-query@5 @lens-protocol/wagmi@latest` |
 *
 * Follow the [Wagmi documentation](https://wagmi.sh/react/getting-started#create-config) to create the Wagmi configuration.
 *
 * ```ts
 * import { createConfig, http } from "wagmi";
 * import { polygon } from "wagmi/chains";
 *
 * const wagmiConfig = createConfig({
 *   chains: [polygon],
 *   transports: {
 *     [polygon.id]: http(),
 *   },
 * });
 * ```
 *
 * Next, use this configuration with the `bindings` from the `@lens-protocol/wagmi` package to generate the [LensConfig](https://lens-protocol.github.io/lens-sdk/types/_lens_protocol_react_web.index.LensConfig.html) object.
 *
 *
 * ```ts
 * import { LensConfig, production } from "@lens-protocol/react-web";
 * import { bindings } from "@lens-protocol/wagmi";
 *
 * const lensConfig: LensConfig = {
 *   environment: production,
 *   bindings: bindings(wagmiConfig),
 * };
 * ```
 *
 * Now, wrap your app with the `<LensProvider>` component and pass the `LensConfig` object you created earlier.
 *
 * ```tsx
 * import { LensProvider } from '@lens-protocol/react-web';
 * import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
 * import { WagmiProvider } from "wagmi";
 *
 * const queryClient = new QueryClient();
 *
 * function App() {
 *   return (
 *     <WagmiProvider config={wagmiConfig}>
 *       <QueryClientProvider client={queryClient}>
 *         <LensProvider config={lensConfig}>
 *           <YourApp />
 *         </LensProvider>
 *       </QueryClientProvider>
 *     </WagmiProvider>
 *   );
 * }
 * ```
 *
 * ### Custom bindings
 *
 * You can create custom bindings for your own `Signer` and `Provider` by implementing the {@link IBindings} interface.
 *
 * @example
 * An example of how to create custom bindings for a `Wallet` from `ethers.js`
 * ```ts
 * import { InfuraProvider, Wallet } from 'ethers';
 * import { IBindings } from '@lens-protocol/react-web';
 *
 * const provider = new providers.InfuraProvider('maticmum');
 * const wallet = new Wallet('<your-private-key>', provider);
 *
 * const bindings: IBindings = {
 *   getProvider: () => provider,
 *   getSigner: () => wallet
 * };
 * ```
 */
'use client';

import { LensConfig, LensProvider, LensProviderProps } from './LensProvider';

export * from '@lens-protocol/react';
export * from './storage';

// NOTE: local exports takes priority over package exports, basically overriding the hooks with same names from @lens-protocol/react
// see https://github.com/systemjs/systemjs/issues/1031#issuecomment-171262430
export { LensProvider };
export type { LensConfig, LensProviderProps };

// Shadows the types from @lens-protocol/react so that they cannot be used nor surfaced in reference docs for @lens-protocol/react-web
export type EncryptionConfig = never;
