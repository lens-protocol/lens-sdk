/**
 * @module Core
 *
 * ## Quick start
 *
 * Install:
 *
 * | Package Manager | Command |
 * |:---------------:|:------- |
 * | npm             | `npm install @lens-protocol/react-web@latest` |
 * | yarn            | `yarn add @lens-protocol/react-web@latest` |
 * | pnpm            | `pnpm add @lens-protocol/react-web@latest` |
 *
 * If you use [wagmi](https://wagmi.sh/) you can install the companion package:
 *
 * | Package Manager | Command |
 * |:---------------:|:------- |
 * | npm             | `npm install @lens-protocol/wagmi@latest` |
 * | yarn            | `yarn add @lens-protocol/wagmi@latest` |
 * | pnpm            | `pnpm add @lens-protocol/wagmi@latest` |
 *
 * In the following examples we will show you integration with wagmi and we will explain later how to use custom bindings.
 *
 * Create the {@link LensConfig}:
 *
 * ```ts
 * import { LensConfig, development } from '@lens-protocol/react-web';
 * import { bindings as wagmiBindings } from '@lens-protocol/wagmi';
 *
 * const lensConfig: LensConfig = {
 *   bindings: wagmiBindings(),
 *   environment: development,
 * };
 * ```
 *
 * Wrap your app with the {@link LensProvider | `<LensProvider>`} and pass the `LensConfig` as a prop.
 *
 * ```tsx
 * import { LensProvider } from '@lens-protocol/react-web';
 *
 * function App() {
 *   return (
 *     <WagmiConfig config={config}>
 *       <LensProvider config={lensConfig}>
 *         <YourRoutes />
 *       </LensProvider>
 *     </WagmiConfig>
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
