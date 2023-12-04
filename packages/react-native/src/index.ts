/**
 * ## Quick start
 *
 * Install:
 *
 * | Package Manager | Command |
 * |:---------------:|:------- |
 * | npm             | `npm install @lens-protocol/react-native@latest ethers@legacy-v5` |
 * | yarn            | `yarn add @lens-protocol/react-native@latest ethers@legacy-v5` |
 * | pnpm            | `pnpm add @lens-protocol/react-native@latest ethers@legacy-v5` |
 *
 * First we need to create so-called bindings. Bindings are just an object implementing the {@link IBindings} interface. This is used by the Lens SDK to access the Signer and the Provider.
 *
 * In this example we will limit ourselves to the bare minimum and we will use the `ethers.js` library to create the bindings.
 *
 * ```ts
 * // wallet.ts
 * import { IBindings } from '@lens-protocol/react-native';
 * import { providers, Wallet } from 'ethers';
 *
 * const provider = new providers.InfuraProvider('maticmum');
 * const wallet = new Wallet('<your-private-key>', provider);
 *
 * export function bindings(): IBindings {
 *   return {
 *     getProvider: async () => provider,
 *     getSigner: async () => wallet,
 *   };
 * }
 * ```
 *
 * Create the {@link LensConfig}. In this example we will use `react-native-mmkk` as underlying storage. You can use any storage you want as long as it implements the {@link IStorageProvider} interface.
 *
 * First install the `react-native-mmkv` package:
 *
 * | Package Manager | Command |
 * |:---------------:|:------- |
 * | npm             | `npm install react-native-mmkv` |
 * | yarn            | `yarn add react-native-mmkv` |
 * | pnpm            | `pnpm add react-native-mmkv` |
 *
 * Create the `LensConfig` object:
 *
 * ```ts
 * import { LensConfig, development } from '@lens-protocol/react-web';
 * import { storage } from '@lens-protocol/react-web/storage/mmkv';
 * import { bindings } from './wallet.ts';
 *
 * const lensConfig: LensConfig = {
 *   bindings: bindings(),
 *   environment: development,
 *   storage: storage(),
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
 *     <LensProvider config={lensConfig}>
 *       <YourApp />
 *     </LensProvider>
 *   );
 * }
 * ```
 *
 * @module
 */

export * from '@lens-protocol/react';

// NOTE: local exports takes priority over package exports, basically overriding the hooks with same names from @lens-protocol/react
// see https://github.com/systemjs/systemjs/issues/1031#issuecomment-171262430

// Shadows the types from @lens-protocol/react so that they cannot be used nor surfaced in reference docs for @lens-protocol/react-web
export type EncryptionConfig = never;
