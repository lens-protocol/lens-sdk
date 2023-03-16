# Lens SDK + react-native

This package is an example app showcasing the `@lens-protocol/react` integration with [react-native](https://reactnative.dev/).

The example app is using a wonderful [`react-native-mmkv`](https://github.com/mrousavy/react-native-mmkv) as a storage provider and very basic wallet implementation.

It is not published or released anywhere directly.

## Integrating with `@lens-protocol/react`

`@lens-protocol/react` was designed to work both with web and mobile. For the web it works by default without much of the configuration but due to the `react-native` nature we require some additional setup.

### Implement storage provider

`react-native` storage needs are different from the web apps and developers have more freedom to choose between the storage implementations ([@react-native-async-storage/async-storage](https://react-native-async-storage.github.io/async-storage/docs/install), [react-native-mmkv](https://github.com/mrousavy/react-native-mmkv), etc.).
Given the above we don't include any build in storage provider in the `@lens-procol/react` package and require the developers to choose the storage implementation that fits their needs.

We provide an example storage provider implementation on top of [react-native-mmkv](https://github.com/mrousavy/react-native-mmkv) that can be used as a starting point (or just blindly copied 🫣).
The source of the `MmkvStorageProvider` can be found under `./src/mmkvStorageProvider.ts`.

### Implement wallet bindings

Implementing secure wallet is a challenge in it own and is out of scope of the example app.

The example app has a very simple in memory wallet implementation that is good for initial hacking (check the `./src/wallet.ts`) but it should not be used as base for any production app.

It's a developer responsibility to build a secure wallet and provide a proper implementation for `IBindings` interface so `@lens-protocol/react` can access the `ethers` `Provider` and `Signer` when needed.

### Install required shims

```bash
npm install react-native-get-random-values @ethersproject/shims
```

Import all the packages installed above BEFORE any `@lens-protocol/react` imports.

```ts
// Import the crypto getRandomValues shim (**BEFORE** the shims)
import 'react-native-get-random-values';
// Import the the ethers shims (**BEFORE** ethers)
import '@ethersproject/shims';

import {LensProvider} from '@lens-protocol/react';
```

### Create `LensConfig` and wrap app with `LensProvider`

```tsx
import {LensConfig, LensProvider, staging} from '@lens-protocol/react';

import {mmkvStorageProvider} from './src/mmkvStorageProvider';
import {bindings} from './src/wallet';

const lensConfig: LensConfig = {
  bindings: bindings(),
  environment: staging,
  storage: mmkvStorageProvider(),
};

export function App() {
  return (
    <LensProvider config={lensConfig}>
      <YourApp />
    </LensProvider>
  );
}
```

### Happy hacking 🌿

Refer to our documentation to get a list of available hooks - https://docs.lens.xyz/docs/sdk-react-intro

#### Having troubles?

Ask on the Lens API and SDK channel in our [Discord](https://discord.gg/lensprotocol)

## Running locally

Install example dependencies via (should be run from the `examples/react-native` folder:

```bash
pnpm install
```

Make sure your development environment is ready to start locally `react-native` app by following the [official docs](https://reactnative.dev/docs/environment-setup).

You can run the dev server via:

```bash
pnpm start
```

Run the android/ios simulators via:

```bash
cd ios

bundle install
bundle exec pod install

pnpm ios

# or

pnpm android
```

Ensure you previously built all the dependencies. See [main setup](../../README.md#setup).
