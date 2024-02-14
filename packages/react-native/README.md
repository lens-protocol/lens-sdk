# Lens React Native SDK

The official Lens Protocol React bindings for React Native.

---

This package enables you to build mobile applications on top of the Lens Protocol using React Native.

## Documentation

- [GitHub monorepo](https://github.com/lens-protocol/lens-sdk)
- [Reference](https://lens-protocol.github.io/lens-sdk/modules/_lens_protocol_react_native.html)

## Quick start

Install the Lens React Native SDK package using your package manager of choice:

| Package Manager | Command                                          |
| :-------------: | :----------------------------------------------- |
|       npm       | `npm install @lens-protocol/react-native@latest` |
|      yarn       | `yarn add @lens-protocol/react-native@latest`    |
|      pnpm       | `pnpm add @lens-protocol/react-native@latest`    |

First we need to create so-called bindings. Bindings are just an object implementing the `IBindings` interface. This is used by the Lens SDK to access the Signer and the Provider.

In this example we will limit ourselves to the bare minimum and we will use the `ethers.js` library to create the bindings.

```ts
// wallet.ts
import { IBindings } from '@lens-protocol/react-native';
import { providers, Wallet } from 'ethers';

const provider = new providers.InfuraProvider('maticmum');
const wallet = new Wallet('<your-private-key>', provider);

export const bindings: IBindings = {
  getProvider: async () => provider,
  getSigner: async () => wallet,
};
```

Create the `LensConfig`. In this example we will use `react-native-mmkk` as underlying storage. You can use any storage you want as long as it implements the `IStorageProvider` interface.

First install the `react-native-mmkv` package:

| Package Manager | Command                         |
| :-------------: | :------------------------------ |
|       npm       | `npm install react-native-mmkv` |
|      yarn       | `yarn add react-native-mmkv`    |
|      pnpm       | `pnpm add react-native-mmkv`    |

Create the `LensConfig` object:

```ts
import { LensConfig, development } from '@lens-protocol/react-web';
import { storage } from '@lens-protocol/react-web/storage/mmkv';
import { bindings } from './wallet.ts';

const lensConfig: LensConfig = {
  bindings,
  environment: development,
  storage: storage(),
};
```

Wrap your app with the `<LensProvider>` and pass the `LensConfig` as a prop.

```tsx
import { LensProvider } from '@lens-protocol/react-web';

function App() {
  return (
    <LensProvider config={lensConfig}>
      <YourApp />
    </LensProvider>
  );
}
```
